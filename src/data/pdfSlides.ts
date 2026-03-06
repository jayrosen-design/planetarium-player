// Auto-import all slide images from the PDF
import { dsoPhotoMap } from './dsoPhotos';
import { MediaItem } from '@/store/planetariumStore';
import page01 from '@/assets/slides/page_01.jpg';
import page02 from '@/assets/slides/page_02.jpg';
import page03 from '@/assets/slides/page_03.jpg';
import page04 from '@/assets/slides/page_04.jpg';
import page05 from '@/assets/slides/page_05.jpg';
import page06 from '@/assets/slides/page_06.jpg';
import page07 from '@/assets/slides/page_07.jpg';
import page08 from '@/assets/slides/page_08.jpg';
import page09 from '@/assets/slides/page_09.jpg';
import page10 from '@/assets/slides/page_10.jpg';
import page11 from '@/assets/slides/page_11.jpg';
import page12 from '@/assets/slides/page_12.jpg';
import page13 from '@/assets/slides/page_13.jpg';
import page14 from '@/assets/slides/page_14.jpg';
import page15 from '@/assets/slides/page_15.jpg';
import page16 from '@/assets/slides/page_16.jpg';
import page17 from '@/assets/slides/page_17.jpg';
import page18 from '@/assets/slides/page_18.jpg';
import page19 from '@/assets/slides/page_19.jpg';
import page20 from '@/assets/slides/page_20.jpg';
import page21 from '@/assets/slides/page_21.jpg';
import page22 from '@/assets/slides/page_22.jpg';
import page23 from '@/assets/slides/page_23.jpg';
import page24 from '@/assets/slides/page_24.jpg';
import page25 from '@/assets/slides/page_25.jpg';
import page26 from '@/assets/slides/page_26.jpg';
import page27 from '@/assets/slides/page_27.jpg';
import page28 from '@/assets/slides/page_28.jpg';
import page29 from '@/assets/slides/page_29.jpg';
import page30 from '@/assets/slides/page_30.jpg';
import page31 from '@/assets/slides/page_31.jpg';
import page32 from '@/assets/slides/page_32.jpg';
// MediaItem is imported at top

const astroApertureItem: MediaItem = {
  id: 'website-astro-aperture',
  filename: 'Astro Aperture',
  type: 'website',
  blobUrl: '',
  url: 'https://astroaperture.lovable.app/',
};

const websiteItem: MediaItem = {
  id: 'website-dark-sky',
  filename: 'Dark Sky Simulator',
  type: 'website',
  blobUrl: '',
  url: 'https://dark-sky-simulator.lovable.app/',
};

const exoskyItem: MediaItem = {
  id: 'website-exosky',
  filename: 'Astraeus Rupertus',
  type: 'website',
  blobUrl: '',
  url: 'https://html-classic.itch.zone/html/11787167/Exosky4/index.html',
};

// DSO Catalog - each links to the procedural three.js simulation
export const dsoCatalog = [
  { id: 'M1', name: 'Crab Nebula', type: 'snr' },
  { id: 'M2', name: 'M2', type: 'globular' },
  { id: 'M3', name: 'M3', type: 'globular' },
  { id: 'M4', name: 'M4', type: 'globular' },
  { id: 'M5', name: 'M5', type: 'globular' },
  { id: 'M6', name: 'Butterfly Cluster', type: 'open' },
  { id: 'M7', name: 'Ptolemy Cluster', type: 'open' },
  { id: 'M8', name: 'Lagoon Nebula', type: 'diffuse' },
  { id: 'M9', name: 'M9', type: 'globular' },
  { id: 'M10', name: 'M10', type: 'globular' },
  { id: 'M11', name: 'Wild Duck Cluster', type: 'open' },
  { id: 'M12', name: 'M12', type: 'globular' },
  { id: 'M13', name: 'Hercules Cluster', type: 'globular' },
  { id: 'M14', name: 'M14', type: 'globular' },
  { id: 'M15', name: 'M15', type: 'globular' },
  { id: 'M16', name: 'Eagle Nebula', type: 'diffuse' },
  { id: 'M17', name: 'Omega Nebula', type: 'diffuse' },
  { id: 'M18', name: 'M18', type: 'open' },
  { id: 'M19', name: 'M19', type: 'globular' },
  { id: 'M20', name: 'Trifid Nebula', type: 'diffuse' },
  { id: 'M21', name: 'M21', type: 'open' },
  { id: 'M22', name: 'M22', type: 'globular' },
  { id: 'M23', name: 'M23', type: 'open' },
  { id: 'M24', name: 'Sagittarius Star Cloud', type: 'open' },
  { id: 'M25', name: 'M25', type: 'open' },
  { id: 'M26', name: 'M26', type: 'open' },
  { id: 'M27', name: 'Dumbbell Nebula', type: 'planetary' },
  { id: 'M28', name: 'M28', type: 'globular' },
  { id: 'M29', name: 'M29', type: 'open' },
  { id: 'M30', name: 'M30', type: 'globular' },
  { id: 'M31', name: 'Andromeda Galaxy', type: 'spiral' },
  { id: 'M32', name: 'M32', type: 'elliptical' },
  { id: 'M33', name: 'Triangulum Galaxy', type: 'spiral' },
  { id: 'M34', name: 'M34', type: 'open' },
  { id: 'M35', name: 'M35', type: 'open' },
  { id: 'M36', name: 'M36', type: 'open' },
  { id: 'M37', name: 'M37', type: 'open' },
  { id: 'M38', name: 'M38', type: 'open' },
  { id: 'M39', name: 'M39', type: 'open' },
  { id: 'M40', name: 'Winnecke 4', type: 'open' },
  { id: 'M41', name: 'M41', type: 'open' },
  { id: 'M42', name: 'Orion Nebula', type: 'diffuse' },
  { id: 'M43', name: "De Mairan's Nebula", type: 'diffuse' },
  { id: 'M44', name: 'Beehive Cluster', type: 'open' },
  { id: 'M45', name: 'Pleiades', type: 'open' },
  { id: 'M46', name: 'M46', type: 'open' },
  { id: 'M47', name: 'M47', type: 'open' },
  { id: 'M48', name: 'M48', type: 'open' },
  { id: 'M49', name: 'M49', type: 'elliptical' },
  { id: 'M50', name: 'M50', type: 'open' },
  { id: 'M51', name: 'Whirlpool Galaxy', type: 'spiral' },
  { id: 'M52', name: 'M52', type: 'open' },
  { id: 'M53', name: 'M53', type: 'globular' },
  { id: 'M54', name: 'M54', type: 'globular' },
  { id: 'M55', name: 'M55', type: 'globular' },
  { id: 'M56', name: 'M56', type: 'globular' },
  { id: 'M57', name: 'Ring Nebula', type: 'planetary' },
  { id: 'M58', name: 'M58', type: 'spiral' },
  { id: 'M59', name: 'M59', type: 'elliptical' },
  { id: 'M60', name: 'M60', type: 'elliptical' },
  { id: 'M61', name: 'M61', type: 'spiral' },
  { id: 'M62', name: 'M62', type: 'globular' },
  { id: 'M63', name: 'Sunflower Galaxy', type: 'spiral' },
  { id: 'M64', name: 'Black Eye Galaxy', type: 'spiral' },
  { id: 'M65', name: 'M65', type: 'spiral' },
  { id: 'M66', name: 'M66', type: 'spiral' },
  { id: 'M67', name: 'M67', type: 'open' },
  { id: 'M68', name: 'M68', type: 'globular' },
  { id: 'M69', name: 'M69', type: 'globular' },
  { id: 'M70', name: 'M70', type: 'globular' },
  { id: 'M71', name: 'M71', type: 'globular' },
  { id: 'M72', name: 'M72', type: 'globular' },
  { id: 'M73', name: 'M73', type: 'open' },
  { id: 'M74', name: 'Phantom Galaxy', type: 'spiral' },
  { id: 'M75', name: 'M75', type: 'globular' },
  { id: 'M76', name: 'Little Dumbbell', type: 'planetary' },
  { id: 'M77', name: 'Cetus A', type: 'spiral' },
  { id: 'M78', name: 'M78', type: 'diffuse' },
  { id: 'M79', name: 'M79', type: 'globular' },
  { id: 'M80', name: 'M80', type: 'globular' },
  { id: 'M81', name: "Bode's Galaxy", type: 'spiral' },
  { id: 'M82', name: 'Cigar Galaxy', type: 'edge-on' },
  { id: 'M83', name: 'Southern Pinwheel', type: 'spiral' },
  { id: 'M84', name: 'M84', type: 'elliptical' },
  { id: 'M85', name: 'M85', type: 'elliptical' },
  { id: 'M86', name: 'M86', type: 'elliptical' },
  { id: 'M87', name: 'Virgo A', type: 'elliptical' },
  { id: 'M88', name: 'M88', type: 'spiral' },
  { id: 'M89', name: 'M89', type: 'elliptical' },
  { id: 'M90', name: 'M90', type: 'spiral' },
  { id: 'M91', name: 'M91', type: 'spiral' },
  { id: 'M92', name: 'M92', type: 'globular' },
  { id: 'M93', name: 'M93', type: 'open' },
  { id: 'M94', name: 'M94', type: 'spiral' },
  { id: 'M95', name: 'M95', type: 'spiral' },
  { id: 'M96', name: 'M96', type: 'spiral' },
  { id: 'M97', name: 'Owl Nebula', type: 'planetary' },
  { id: 'M98', name: 'M98', type: 'spiral' },
  { id: 'M99', name: 'M99', type: 'spiral' },
  { id: 'M100', name: 'M100', type: 'spiral' },
  { id: 'M101', name: 'Pinwheel Galaxy', type: 'spiral' },
  { id: 'M102', name: 'Spindle Galaxy', type: 'edge-on' },
  { id: 'M103', name: 'M103', type: 'open' },
  { id: 'M104', name: 'Sombrero Galaxy', type: 'edge-on' },
  { id: 'M105', name: 'M105', type: 'elliptical' },
  { id: 'M106', name: 'M106', type: 'spiral' },
  { id: 'M107', name: 'M107', type: 'globular' },
  { id: 'M108', name: 'M108', type: 'edge-on' },
  { id: 'M109', name: 'M109', type: 'spiral' },
  { id: 'M110', name: 'M110', type: 'elliptical' },
  { id: 'C4', name: 'Iris Nebula', type: 'diffuse' },
  { id: 'C5', name: 'IC 342', type: 'spiral' },
  { id: 'C9', name: 'Cave Nebula', type: 'diffuse' },
  { id: 'C11', name: 'Bubble Nebula', type: 'diffuse' },
  { id: 'C14', name: 'Double Cluster', type: 'open' },
  { id: 'C19', name: 'Cocoon Nebula', type: 'diffuse' },
  { id: 'C20', name: 'North America Nebula', type: 'diffuse' },
  { id: 'C22', name: 'Blue Snowball', type: 'planetary' },
  { id: 'C27', name: 'Crescent Nebula', type: 'diffuse' },
  { id: 'C30', name: 'NGC 7331', type: 'spiral' },
  { id: 'C31', name: 'Flaming Star Nebula', type: 'diffuse' },
  { id: 'C33', name: 'East Veil Nebula', type: 'snr' },
  { id: 'C34', name: 'West Veil Nebula', type: 'snr' },
  { id: 'C41', name: 'Hyades', type: 'open' },
  { id: 'C44', name: 'Rho Ophiuchi Cloud', type: 'diffuse' },
  { id: 'C49', name: 'Rosette Nebula', type: 'diffuse' },
  { id: 'C63', name: 'Helix Nebula', type: 'planetary' },
  { id: 'C69', name: 'Bug Nebula', type: 'planetary' },
  { id: 'C77', name: 'Centaurus A', type: 'elliptical' },
  { id: 'C80', name: 'Omega Centauri', type: 'globular' },
];

const dsoItems: MediaItem[] = dsoCatalog.map((dso) => ({
  id: `dso-${dso.id}`,
  filename: `${dso.id} – ${dso.name}`,
  type: 'website' as const,
  blobUrl: '',
  url: `/dso-simulations.html#${dso.id}`,
  folder: 'Catalogs',
}));

const slideItems: MediaItem[] = [
  page01, page02, page03, page04, page05, page06, page07, page08,
  page09, page10, page11, page12, page13, page14, page15, page16,
  page17, page18, page19, page20, page21, page22, page23, page24,
  page25, page26, page27, page28, page29, page30, page31, page32,
].map((url, i) => ({
  id: `slide-${i + 1}`,
  filename: `Slide ${i + 1} of 32`,
  type: 'image' as const,
  blobUrl: url,
  folder: 'Preserving Natural Skies',
}));

// Astrophotography items from jayrosen.design gallery
const astrophotoItems: MediaItem[] = Object.entries(dsoPhotoMap).flatMap(([dsoId, photos]) =>
  photos.map((photo, i) => ({
    id: `astro-${dsoId}-${i}`,
    filename: photo.title,
    type: 'image' as const,
    blobUrl: photo.imageUrl,
    folder: 'Astrophotography',
  }))
);

export const pdfSlides: MediaItem[] = [...astrophotoItems, ...dsoItems, ...slideItems, astroApertureItem, websiteItem, exoskyItem];
