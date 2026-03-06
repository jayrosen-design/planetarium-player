// Auto-import all slide images from the PDF
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

import { MediaItem } from '@/store/planetariumStore';

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
const dsoCatalog = [
  { id: 'M1', name: 'Crab Nebula' },
  { id: 'M2', name: 'M2' },
  { id: 'M3', name: 'M3' },
  { id: 'M4', name: 'M4' },
  { id: 'M5', name: 'M5' },
  { id: 'M6', name: 'Butterfly Cluster' },
  { id: 'M7', name: 'Ptolemy Cluster' },
  { id: 'M8', name: 'Lagoon Nebula' },
  { id: 'M9', name: 'M9' },
  { id: 'M10', name: 'M10' },
  { id: 'M11', name: 'Wild Duck Cluster' },
  { id: 'M12', name: 'M12' },
  { id: 'M13', name: 'Hercules Cluster' },
  { id: 'M14', name: 'M14' },
  { id: 'M15', name: 'M15' },
  { id: 'M16', name: 'Eagle Nebula' },
  { id: 'M17', name: 'Omega Nebula' },
  { id: 'M18', name: 'M18' },
  { id: 'M19', name: 'M19' },
  { id: 'M20', name: 'Trifid Nebula' },
  { id: 'M21', name: 'M21' },
  { id: 'M22', name: 'M22' },
  { id: 'M23', name: 'M23' },
  { id: 'M24', name: 'Sagittarius Star Cloud' },
  { id: 'M25', name: 'M25' },
  { id: 'M26', name: 'M26' },
  { id: 'M27', name: 'Dumbbell Nebula' },
  { id: 'M28', name: 'M28' },
  { id: 'M29', name: 'M29' },
  { id: 'M30', name: 'M30' },
  { id: 'M31', name: 'Andromeda Galaxy' },
  { id: 'M32', name: 'M32' },
  { id: 'M33', name: 'Triangulum Galaxy' },
  { id: 'M34', name: 'M34' },
  { id: 'M35', name: 'M35' },
  { id: 'M36', name: 'M36' },
  { id: 'M37', name: 'M37' },
  { id: 'M38', name: 'M38' },
  { id: 'M39', name: 'M39' },
  { id: 'M40', name: 'Winnecke 4' },
  { id: 'M41', name: 'M41' },
  { id: 'M42', name: 'Orion Nebula' },
  { id: 'M43', name: "De Mairan's Nebula" },
  { id: 'M44', name: 'Beehive Cluster' },
  { id: 'M45', name: 'Pleiades' },
  { id: 'M46', name: 'M46' },
  { id: 'M47', name: 'M47' },
  { id: 'M48', name: 'M48' },
  { id: 'M49', name: 'M49' },
  { id: 'M50', name: 'M50' },
  { id: 'M51', name: 'Whirlpool Galaxy' },
  { id: 'M52', name: 'M52' },
  { id: 'M53', name: 'M53' },
  { id: 'M54', name: 'M54' },
  { id: 'M55', name: 'M55' },
  { id: 'M56', name: 'M56' },
  { id: 'M57', name: 'Ring Nebula' },
  { id: 'M58', name: 'M58' },
  { id: 'M59', name: 'M59' },
  { id: 'M60', name: 'M60' },
  { id: 'M61', name: 'M61' },
  { id: 'M62', name: 'M62' },
  { id: 'M63', name: 'Sunflower Galaxy' },
  { id: 'M64', name: 'Black Eye Galaxy' },
  { id: 'M65', name: 'M65' },
  { id: 'M66', name: 'M66' },
  { id: 'M67', name: 'M67' },
  { id: 'M68', name: 'M68' },
  { id: 'M69', name: 'M69' },
  { id: 'M70', name: 'M70' },
  { id: 'M71', name: 'M71' },
  { id: 'M72', name: 'M72' },
  { id: 'M73', name: 'M73' },
  { id: 'M74', name: 'Phantom Galaxy' },
  { id: 'M75', name: 'M75' },
  { id: 'M76', name: 'Little Dumbbell' },
  { id: 'M77', name: 'Cetus A' },
  { id: 'M78', name: 'M78' },
  { id: 'M79', name: 'M79' },
  { id: 'M80', name: 'M80' },
  { id: 'M81', name: "Bode's Galaxy" },
  { id: 'M82', name: 'Cigar Galaxy' },
  { id: 'M83', name: 'Southern Pinwheel' },
  { id: 'M84', name: 'M84' },
  { id: 'M85', name: 'M85' },
  { id: 'M86', name: 'M86' },
  { id: 'M87', name: 'Virgo A' },
  { id: 'M88', name: 'M88' },
  { id: 'M89', name: 'M89' },
  { id: 'M90', name: 'M90' },
  { id: 'M91', name: 'M91' },
  { id: 'M92', name: 'M92' },
  { id: 'M93', name: 'M93' },
  { id: 'M94', name: 'M94' },
  { id: 'M95', name: 'M95' },
  { id: 'M96', name: 'M96' },
  { id: 'M97', name: 'Owl Nebula' },
  { id: 'M98', name: 'M98' },
  { id: 'M99', name: 'M99' },
  { id: 'M100', name: 'M100' },
  { id: 'M101', name: 'Pinwheel Galaxy' },
  { id: 'M102', name: 'Spindle Galaxy' },
  { id: 'M103', name: 'M103' },
  { id: 'M104', name: 'Sombrero Galaxy' },
  { id: 'M105', name: 'M105' },
  { id: 'M106', name: 'M106' },
  { id: 'M107', name: 'M107' },
  { id: 'M108', name: 'M108' },
  { id: 'M109', name: 'M109' },
  { id: 'M110', name: 'M110' },
  { id: 'C4', name: 'Iris Nebula' },
  { id: 'C5', name: 'IC 342' },
  { id: 'C9', name: 'Cave Nebula' },
  { id: 'C11', name: 'Bubble Nebula' },
  { id: 'C14', name: 'Double Cluster' },
  { id: 'C19', name: 'Cocoon Nebula' },
  { id: 'C20', name: 'North America Nebula' },
  { id: 'C22', name: 'Blue Snowball' },
  { id: 'C27', name: 'Crescent Nebula' },
  { id: 'C30', name: 'NGC 7331' },
  { id: 'C31', name: 'Flaming Star Nebula' },
  { id: 'C33', name: 'East Veil Nebula' },
  { id: 'C34', name: 'West Veil Nebula' },
  { id: 'C41', name: 'Hyades' },
  { id: 'C44', name: 'Rho Ophiuchi Cloud' },
  { id: 'C49', name: 'Rosette Nebula' },
  { id: 'C63', name: 'Helix Nebula' },
  { id: 'C69', name: 'Bug Nebula' },
  { id: 'C77', name: 'Centaurus A' },
  { id: 'C80', name: 'Omega Centauri' },
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

export const pdfSlides: MediaItem[] = [...dsoItems, ...slideItems, astroApertureItem, websiteItem, exoskyItem];
