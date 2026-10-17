/**
 * Real photographs, served from Unsplash's CDN (free to use under the Unsplash License;
 * attribution isn't required but we credit photographers where we know them — see the footer).
 *
 * To use your own artists' work instead: change `id` to a full URL (e.g. "/artists/anika.jpg")
 * — anything starting with "/" or "http" is used as-is.
 */

export type PhotoDef = { id: string; label: string; alt: string; by?: string };

const def = (id: string, label: string, alt: string, by?: string): PhotoDef => ({ id, label, alt, by });

export const PHOTOS = {
  kathak: def("1759141642117-e2591341ff5f", "Kathak", "A dancer in traditional Indian attire performing Kathak", "sid_s_clicks"),
  kathakali: def("1776736708415-6aa6b6aff4ea", "Kathakali", "A Kathakali dancer in elaborate costume and makeup", "srivastavankit"),
  pichwai: def("1745195734388-db01e755ebb6", "Pichwai", "A decorated cow painted among lotus flowers, in the Pichwai style", "jensholm"),
  miniature: def("1719498481691-d78f24dcff1b", "Miniature painting", "An Indian miniature painting of a woman with peacocks in a garden", "clevelandart"),
  miniature2: def("1719495850124-8d2aee72ff30", "Miniature painting", "An Indian miniature painting of a woman standing by a tree", "clevelandart"),
  painterFloor: def("1611244420030-b22f359eee31", "Painter", "A painter working on the floor with blue paint", "jungfish"),
  painterOutdoor: def("1660092626225-f291ab2970b9", "Plein air", "A woman painting at an easel outdoors", "carolineveronez"),
  painterSmile: def("1633887091219-265c29eac4cd", "Painter", "A smiling painter holding a brush and palette", "ramitvofficial"),
  easel: def("1644375391877-0ae77eeed8fc", "Studio", "A hand painting on an easel", "_sriggs"),
  paintClose: def("1649479435119-1d987ed1ae36", "Texture", "A close-up of thick paint on a canvas", "wesleyphotography"),
  brushes: def("1613746203812-717e6e5db3da", "Brushes", "Paint brushes in a glass jar", "lauraadaiphoto"),
  clapper: def("1485846234645-a62644f84728", "Film", "A film clapperboard by the roadside", "jakobowens1"),
  filmSet: def("1612544409025-e1f6a56c1152", "On set", "A film crew working on a large soundstage", "brandsandpeople"),
  crew: def("1632187981988-40f3cbaeef5e", "Crew", "A group of people around a camera set-up", "jakobowens1"),
  camera: def("1782889187454-a568fe1f20e2", "Camera", "A film crew with a large camera under a cloudy sky", "kriss_films"),
  stage: def("1503095396549-807759245b35", "Theatre", "Silhouettes of three performers on stage", "kyleunderscorehead"),
  curtain: def("1514306191717-452ec28c7814", "Stage", "A red theatre curtain", "roblaughter"),
  potter: def("1493106641515-6b5631de4bb9", "Ceramics", "A potter shaping a vase on the wheel", "momentance"),
  gallery: def("1606819717115-9159c900370b", "Gallery", "A woman standing in front of paintings in a gallery", "zalfaimani"),
  mural: def("1654607537422-6d75f7e4b757", "Street art", "A mural of a bird on the side of a building", "shepherd98"),
  sitar: def("1782407439539-b86498ab28c4", "Sitar", "A man in an orange turban playing a traditional stringed instrument", "kushalib15"),
  sitarClose: def("1646765566496-8744ce5e7738", "Strings", "A close-up of hands playing a stringed instrument", "saubhagya2304"),
  studio: def("1598488035139-bdbb2231ce04", "Recording", "A music recording studio with guitars on the wall", "caught_in_joy"),
  designer: def("1744686909434-fd158fca1c35", "Design", "An artist working on a digital tablet in her studio", "tourbox"),
  lettering: def("1498075702571-ecb018f3752d", "Lettering", "A hand lettering on tracing paper with a pencil", "kellysikkema"),
  dancers: def("1756370256926-e48ca54c5efe", "Dance", "Five dancers in colourful traditional Indian attire on steps"),
  dancersJump: def("1663471984093-5925e87e72d5", "Dance", "Dancers leaping in traditional dress"),
  greenhouse: def("1634122191508-45b9c87f8935", "Studio", "A room filled with paintings and plants", "lizgrin"),
} satisfies Record<string, PhotoDef>;

export type PhotoKey = keyof typeof PHOTOS;

export const photoUrl = (id: string, w: number) =>
  id.startsWith("/") || id.startsWith("http")
    ? id
    : `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=68`;

