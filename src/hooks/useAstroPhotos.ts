import { useQuery } from '@tanstack/react-query';

export interface AstroPhoto {
  id: string;
  title: string;
  slug: string;
  sourceUrl: string;
  altText: string;
  width: number;
  height: number;
  tags: string[];
}

interface WPPost {
  id: string;
  title: string;
  slug: string;
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
      mediaDetails: { width: number; height: number };
    };
  } | null;
  tags: { nodes: { name: string; slug: string }[] };
}

async function fetchByTag(tag: string): Promise<AstroPhoto[]> {
  const res = await fetch('https://jayrosen.design/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `query($tag:String!,$first:Int){posts(where:{categoryId:559,tag:$tag,orderby:{field:DATE,order:DESC}},first:$first){nodes{id,title,slug,featuredImage{node{sourceUrl,altText,mediaDetails{width,height}}},tags{nodes{name,slug}}}}}`,
      variables: { tag, first: 50 },
    }),
  });
  const json = await res.json();
  const posts: WPPost[] = json?.data?.posts?.nodes ?? [];
  return posts
    .filter((p) => p.featuredImage?.node?.sourceUrl)
    .map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      sourceUrl: p.featuredImage!.node.sourceUrl,
      altText: p.featuredImage!.node.altText || p.title,
      width: p.featuredImage!.node.mediaDetails?.width ?? 0,
      height: p.featuredImage!.node.mediaDetails?.height ?? 0,
      tags: p.tags.nodes.map((t) => t.slug),
    }));
}

async function fetchAllAstro(): Promise<AstroPhoto[]> {
  const res = await fetch('https://jayrosen.design/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `query($first:Int){posts(where:{categoryId:559,orderby:{field:DATE,order:DESC}},first:$first){nodes{id,title,slug,featuredImage{node{sourceUrl,altText,mediaDetails{width,height}}},tags{nodes{name,slug}}}}}`,
      variables: { first: 100 },
    }),
  });
  const json = await res.json();
  const posts: WPPost[] = json?.data?.posts?.nodes ?? [];
  return posts
    .filter((p) => p.featuredImage?.node?.sourceUrl)
    .map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      sourceUrl: p.featuredImage!.node.sourceUrl,
      altText: p.featuredImage!.node.altText || p.title,
      width: p.featuredImage!.node.mediaDetails?.width ?? 0,
      height: p.featuredImage!.node.mediaDetails?.height ?? 0,
      tags: p.tags.nodes.map((t) => t.slug),
    }));
}

// Map DSO types to WordPress tags
const dsoTypeToTag: Record<string, string> = {
  supernova_remnant: 'nebula',
  snr: 'nebula',
  emission: 'nebula',
  planetary: 'nebula',
  reflection: 'nebula',
  dark: 'nebula',
  diffuse: 'nebula',
  spiral: 'galaxy',
  elliptical: 'galaxy',
  'edge-on': 'galaxy',
  irregular: 'galaxy',
  lenticular: 'galaxy',
  globular: 'cluster',
  open: 'cluster',
  asterism: 'cluster',
  double_star: 'cluster',
  star_cloud: 'milky-way',
};

// Map specific DSO IDs to search terms for title matching
const dsoNameMap: Record<string, string[]> = {
  M1: ['crab'],
  M8: ['lagoon'],
  M13: ['hercules'],
  M16: ['eagle'],
  M17: ['omega nebula', 'swan'],
  M20: ['trifid'],
  M27: ['dumbbell'],
  M31: ['andromeda'],
  M33: ['triangulum'],
  M42: ['orion nebula'],
  M43: ['mairan'],
  M44: ['beehive'],
  M45: ['pleiades'],
  M51: ['whirlpool'],
  M57: ['ring nebula'],
  M63: ['sunflower'],
  M64: ['black eye'],
  M74: ['phantom'],
  M76: ['little dumbbell'],
  M77: ['cetus'],
  M81: ['bode'],
  M82: ['cigar'],
  M83: ['southern pinwheel'],
  M87: ['virgo a'],
  M97: ['owl nebula'],
  M101: ['pinwheel'],
  M102: ['spindle'],
  M104: ['sombrero'],
  C4: ['iris nebula'],
  C9: ['cave nebula'],
  C11: ['bubble'],
  C14: ['double cluster'],
  C19: ['cocoon'],
  C20: ['north america'],
  C27: ['crescent'],
  C31: ['flaming star'],
  C33: ['veil'],
  C34: ['veil'],
  C41: ['hyades'],
  C44: ['rho ophiuchi'],
  C49: ['rosette'],
  C63: ['helix'],
  C69: ['bug nebula'],
  C77: ['centaurus'],
  C80: ['omega centauri'],
};

export function useAstroPhotos(tag?: string) {
  return useQuery({
    queryKey: ['astro-photos', tag ?? 'all'],
    queryFn: () => (tag ? fetchByTag(tag) : fetchAllAstro()),
    staleTime: 1000 * 60 * 30,
  });
}

export function useDsoPhotos(dsoId: string | null, dsoType?: string) {
  const tag = dsoType ? dsoTypeToTag[dsoType] || 'nebula' : undefined;

  return useQuery({
    queryKey: ['astro-photos-dso', dsoId, tag],
    queryFn: async () => {
      if (!tag) return [];
      const photos = await fetchByTag(tag);

      // Try to find specific matches first
      const searchTerms = dsoId ? dsoNameMap[dsoId] : null;
      if (searchTerms) {
        const matched = photos.filter((p) =>
          searchTerms.some(
            (term) =>
              p.title.toLowerCase().includes(term) ||
              p.slug.toLowerCase().includes(term)
          )
        );
        if (matched.length > 0) return matched;
      }

      // Fallback: return all photos of this type
      return photos;
    },
    enabled: !!dsoId && !!tag,
    staleTime: 1000 * 60 * 30,
  });
}
