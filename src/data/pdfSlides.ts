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

export const pdfSlides: MediaItem[] = [
  page01, page02, page03, page04, page05, page06, page07, page08,
  page09, page10, page11, page12, page13, page14, page15, page16,
  page17, page18, page19, page20, page21, page22, page23, page24,
  page25, page26, page27, page28, page29, page30, page31, page32,
].map((url, i) => ({
  id: `slide-${i + 1}`,
  filename: `Slide ${i + 1} of 32`,
  type: 'image' as const,
  blobUrl: url,
}));
