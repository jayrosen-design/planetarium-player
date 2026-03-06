// Static mapping of DSO catalog IDs to astrophotography image URLs
// Sourced from jayrosen.design WordPress gallery (category 559)
// Images are publicly accessible — no CORS issues on <img> tags

export interface AstroPhotoEntry {
  title: string;
  slug: string;
  imageUrl: string;
}

// Each DSO ID maps to one or more photographs
export const dsoPhotoMap: Record<string, AstroPhotoEntry[]> = {
  M1: [
    { title: 'Crab Nebula (M1)', slug: 'crab-nebula-m1', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/02/m1-edit.png' },
  ],
  M4: [
    { title: 'M4', slug: 'm4', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/05/Stacked_53_M-4_10.0s_IRCUT_20250202-062040-rotated.jpg' },
  ],
  M5: [
    { title: 'M5', slug: 'm5', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/04/Stacked_192_M-5_10.0s_IRCUT_20250524-234551-rotated.jpg' },
  ],
  M7: [
    { title: 'Ptolemy Cluster (M7)', slug: 'ptolemy-cluster-m7-2', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/05/Stacked_17_M-7_10.0s_IRCUT_20240831-220718-rotated.jpg' },
  ],
  M8: [
    { title: 'Lagoon & Trifid Nebula (M8 & M20)', slug: 'lagoon-and-trifid-nebula-m8-m20', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/05/m8-stack-edit-scaled.png' },
    { title: 'Lagoon Nebula (M8)', slug: 'lagoon-nebula-m8-2', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/02/Stacked_181_M-8_10.0s_LP_20240810-234824.jpg' },
  ],
  M11: [
    { title: 'Wild Duck Cluster (M11)', slug: 'wild-duck-cluster-m11', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/02/wild-duck-edit.jpg' },
  ],
  M12: [
    { title: 'The Gumball Cluster (M12)', slug: 'the-gumball-cluster-m12', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/05/Stacked_24_M-12_20.0s_IRCUT_20250426-235331-rotated.jpg' },
  ],
  M15: [
    { title: 'Great Pegasus Cluster (M15)', slug: 'great-pegasus-cluster-m15', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/09/Stacked_7_M-15_30.0s_IRCUT_20250913-235131.jpg' },
  ],
  M16: [
    { title: 'Eagle Nebula (M16)', slug: 'eagle-nebula-m16-3', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/06/Stacked_166_mosaic_M-16_10.0s_LP_20250525-003736-rotated.jpg' },
    { title: 'Eagle Nebula (M16)', slug: 'eagle-nebula-m16-2', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/05/Stacked_168_M-16_10.0s_LP_20240811-012839-rotated.jpg' },
  ],
  M17: [
    { title: 'Omega Nebula (M17)', slug: 'omega-nebula-m17-3', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/06/Stacked_135_mosaic_M-17_10.0s_LP_20250525-020118-rotated.jpg' },
    { title: 'Omega Nebula (M17)', slug: 'omega-nebula-m17-2', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/05/Stacked_62_M-17_10.0s_LP_20240811-004015-rotated.jpg' },
  ],
  M19: [
    { title: 'M19', slug: 'm19', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/05/Stacked_16_M-19_20.0s_IRCUT_20250427-012042-rotated.jpg' },
  ],
  M20: [
    { title: 'Lagoon & Trifid Nebula (M8 & M20)', slug: 'lagoon-and-trifid-nebula-m8-m20', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/05/m8-stack-edit-scaled.png' },
  ],
  M22: [
    { title: 'Great Sagittarius Cluster (M22)', slug: 'great-sagittarius-cluster-m22', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/05/Stacked_53_M-22_10.0s_IRCUT_20240831-222535-rotated.jpg' },
  ],
  M27: [
    { title: 'Dumbbell Nebula (M27)', slug: 'dumbbell-nebula-m27-2', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/05/Stacked_62_M-27_10.0s_LP_20240808-230406-rotated.jpg' },
  ],
  M28: [
    { title: 'M28 Cluster', slug: 'm28-cluster', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/09/Stacked_16_M-28_30.0s_IRCUT_20250913-230841.jpg' },
  ],
  M31: [
    { title: 'Andromeda Galaxy (M31)', slug: 'andromeda-galaxy-m31-3', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/09/andromeda-edit.png' },
  ],
  M33: [
    { title: 'Triangulum Galaxy (M33)', slug: 'triangulum-galaxy-m33', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/02/458479308_10226133368902344_8059820564897865940_n.jpg' },
  ],
  M42: [
    { title: 'Orion Nebula (M42)', slug: 'orion-nebula-5', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/02/470874374_10227536916430155_5711365865931892685_n.jpg' },
  ],
  M44: [
    { title: 'Beehive Cluster (M44)', slug: 'beehive-cluster-m44', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/06/Stacked_1_M-44_20.0s_IRCUT_20250524-212021-rotated.jpg' },
  ],
  M45: [
    { title: 'The Pleiades (M45)', slug: 'the-pleiades-m45-3', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/05/Stacked_86_M-45_10.0s_LP_20240901-040709-1.jpg' },
  ],
  M62: [
    { title: 'Flickering Globular Cluster (M62)', slug: 'flickering-globular-cluster-m62', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/05/Stacked_22_M-62_20.0s_IRCUT_20250427-010843-rotated.jpg' },
  ],
  M63: [
    { title: 'Sunflower Galaxy (M63)', slug: 'sunflower-galaxy-m63', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/05/Stacked_109_M-63_10.0s_LP_20250202-031001-rotated.jpg' },
  ],
  'M65+M66': [
    { title: 'Leo Triplet (M65, M66, NGC 3628)', slug: 'leo-triplet-m65-m66-ngc-3628', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/05/Stacked_49_mosaic_NGC-3628_10.0s_IRCUT_20250202-003507-rotated.jpg' },
  ],
  M71: [
    { title: 'The Angelfish Cluster (M71)', slug: 'the-angelfish-cluster-m71', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/05/Stacked_15_M-71_20.0s_IRCUT_20250427-013146-rotated.jpg' },
  ],
  M76: [
    { title: 'Little Dumbbell Nebula (M76)', slug: 'little-dumbbell-nebula-m76', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/05/Stacked_18_M-76_10.0s_LP_20240901-041415-rotated.jpg' },
  ],
  M80: [
    { title: 'M80', slug: 'm80', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/05/Stacked_20_M-80_20.0s_IRCUT_20250427-000553-rotated.jpg' },
  ],
  'M81+M82': [
    { title: "Bode's Galaxy & Cigar Galaxy (M81 & M82)", slug: 'bodes-galaxy-and-cigar-galaxy-m81-m82', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/05/Stacked_63_M-81_20.0s_IRCUT_20250426-212004-1-rotated.jpg' },
  ],
  M83: [
    { title: 'Southern Pinwheel Galaxy (M83)', slug: 'southern-pinwheel-galaxy-m83-2', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/05/Stacked_134_M-83_10.0s_LP_20250202-044001-rotated.jpg' },
  ],
  M85: [
    { title: 'M85 Galaxy', slug: 'm85-galaxy', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/06/Stacked_95_M-85_10.0s_IRCUT_20250524-225712-rotated.jpg' },
  ],
  M95: [
    { title: 'M95 Galaxy', slug: 'm95-galaxy', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/05/Stacked_66_M-95_10.0s_IRCUT_20250202-015001-rotated.jpg' },
  ],
  M99: [
    { title: "St. Catherine's Wheel (M99)", slug: 'st-catherines-wheel-m99', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/05/Stacked_97_M-99_10.0s_LP_20250202-024001-rotated.jpg' },
  ],
  M100: [
    { title: 'M100 Galaxy', slug: 'm100-galaxy', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/06/Stacked_136_M-100_10.0s_IRCUT_20250524-223344-rotated.jpg' },
  ],
  M104: [
    { title: 'Sombrero Galaxy (M104)', slug: 'sombrero-galaxy-m104-2', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/05/Stacked_83_M-104_10.0s_IRCUT_20250202-034000-rotated.jpg' },
  ],
  M106: [
    { title: 'M106 Galaxy', slug: 'm106-galaxy', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/05/Stacked_70_M-106_10.0s_IRCUT_20250202-021001-rotated.jpg' },
  ],
  M107: [
    { title: 'Crucifix Cluster (M107)', slug: 'crucifix-cluster-m107', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/09/Stacked_16_M-107_30.0s_IRCUT_20250913-224616-rotated.jpg' },
  ],
  M109: [
    { title: 'M109 Galaxy', slug: 'm109-galaxy', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/05/Stacked_22_M-109_10.0s_IRCUT_20250202-001423-rotated.jpg' },
  ],
  // Caldwell objects
  C11: [
    { title: 'Bubble Nebula (C11)', slug: 'bubble-nebula-c11-2', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/06/Stacked_798_NGC-7635_10.0s_LP_20250525-064103-rotated.jpg' },
    { title: 'Bubble Nebula (C11)', slug: 'bubble-nebula-c11', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/05/Stacked_112_SH2-162_10.0s_LP_20240811-020927-rotated.jpg' },
  ],
  C14: [
    { title: 'Perseus Double Cluster (C14)', slug: 'perseus-double-cluster-c14', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/05/Stacked_55_NGC-869_10.0s_LP_20240811-025326-rotated.jpg' },
  ],
  C19: [
    { title: 'Cocoon Nebula (C19)', slug: 'cocoon-nebula-c19', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/05/Stacked_46_C-19_10.0s_LP_20240811-022751-rotated.jpg' },
    { title: 'Cocoon Nebula (IC5146)', slug: 'cocoon-nebula-ic5146', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/09/Stacked_21_IC-5146_30.0s_LP_20250914-002522.jpg' },
  ],
  C27: [
    { title: 'Crescent Nebula (NGC6888)', slug: 'crescent-nebula-ngc6888', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/09/Stacked_30_NGC-6888_30.0s_LP_20250914-010851-rotated.jpg' },
    { title: 'Crescent Nebula (NGC 6888)', slug: 'crescent-nebula-ngc-6888', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/05/Stacked_89_NGC-6888_10.0s_LP_20240831-231816-rotated.jpg' },
  ],
  C33: [
    { title: 'Eastern Veil Nebula (NGC 6992)', slug: 'eastern-veil-nebula-ngc-6992', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/05/Stacked_120_NGC-6992_10.0s_LP_20240810-223900-rotated.jpg' },
  ],
  C34: [
    { title: 'Western Veil Nebula (NGC 6960)', slug: 'western-veil-nebula-ngc-6960', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/05/Stacked_122_mosaic_NGC-6960_20.0s_LP_20250427-052905-scaled.jpg' },
  ],
  C49: [
    { title: 'Rosette Nebula (C49)', slug: 'rosette-nebula-c49', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/05/Stacked_106_NGC-2244-Satellite-Cluster_10.0s_LP_20240901-051123-rotated.jpg' },
  ],
  C77: [
    { title: 'Centaurus A (NGC 5128)', slug: 'centaurus-a-ngc-5128', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/05/Stacked_36_NGC-5128_20.0s_IRCUT_20250426-232514.jpg' },
  ],
  C80: [
    { title: 'Omega Centauri (C80)', slug: 'omega-centauri-c80', imageUrl: 'https://jayrosen.design/wp-content/uploads/2025/05/Stacked_62_C-80_20.0s_IRCUT_20250426-230727-rotated.jpg' },
  ],
};

// Gallery link base URL
export const GALLERY_BASE_URL = 'https://astroaperture.lovable.app/gallery/post';
