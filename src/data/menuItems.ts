import briyani from '../assets/menu/briyani.jpg'
import bunParotta from '../assets/menu/bun-parotta.jpg'
import gheeRoast from '../assets/menu/ghee-roast.jpg'
import lollipop from '../assets/menu/lollipop.jpg'
import masalaDosa from '../assets/menu/masal-dosa.png'
import parotta from '../assets/menu/parotta.jpg'
import tandoori from '../assets/menu/tandoori.jpg'

export type MenuItem = {
  id: string
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  /**
   * Full-bleed JPEG/WebP: rounded “floating” frame + cover crop.
   * Omit for transparent PNG cutouts (contain, no box).
   */
  imagePresentation?: 'photo'
  /** Tailwind `object-*` classes for photo mode (include literals so Tailwind can scan). */
  imagePhotoObjectPosition?: string
}

export const menuItems: MenuItem[] = [
  {
    id: 'ghee-roast',
    title: 'Ghee roast',
    description: 'Crisp, slow-roasted dosa with ghee — a house favourite.',
    imageSrc: gheeRoast,
    imageAlt: 'Ghee roast dosa on a plate',
    imagePresentation: 'photo',
    imagePhotoObjectPosition: 'object-[35%_52%]',
  },
  {
    id: 'masala-dosa',
    title: 'Masala dosa',
    description: 'Classic potato masala with chutney and sambar.',
    imageSrc: masalaDosa,
    imageAlt: 'Masala dosa with sides',
    imagePresentation: 'photo',
    imagePhotoObjectPosition: 'object-center',
  },
  {
    id: 'briyani',
    title: 'Briyani',
    description: 'Aromatic rice layered with spices and slow-cooked flavour.',
    imageSrc: briyani,
    imageAlt: 'Plate of briyani',
    imagePresentation: 'photo',
    imagePhotoObjectPosition: 'object-center',
  },
  {
    id: 'bun-parotta',
    title: 'Bun parotta',
    description: 'Flaky layered parotta — soft inside, crisp outside.',
    imageSrc: bunParotta,
    imageAlt: 'Bun parotta',
    imagePresentation: 'photo',
    imagePhotoObjectPosition: 'object-center',
  },
  {
    id: 'lollipop',
    title: 'Chicken lollipop',
    description: 'Frenched drumettes, spiced and crisp-fried.',
    imageSrc: lollipop,
    imageAlt: 'Chicken lollipop',
    imagePresentation: 'photo',
    imagePhotoObjectPosition: 'object-center',
  },
  {
    id: 'parotta',
    title: 'Parotta',
    description: 'Shredded wheat parotta, perfect with kurma or gravy.',
    imageSrc: parotta,
    imageAlt: 'Parotta',
    imagePresentation: 'photo',
    imagePhotoObjectPosition: 'object-center',
  },
  {
    id: 'tandoori',
    title: 'Tandoori',
    description: 'Charred edges, bold marinade — straight from the clay oven.',
    imageSrc: tandoori,
    imageAlt: 'Tandoori platter',
    imagePresentation: 'photo',
    imagePhotoObjectPosition: 'object-center',
  },
]
