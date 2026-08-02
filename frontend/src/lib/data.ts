export interface Artwork {
  id: string;
  title: string;
  artist: {
    name: string;
    avatar: string;
    nationality: string;
    verified: boolean;
  };
  medium: string;
  style: string;
  dimensions: string;
  yearCreated: number;
  price: number;
  imageUrl: string;
  certificateHash: string;
  description: string;
  isFeatured?: boolean;
  provenance: string[];
  roomScaleWidth: number; // width in inches for AR visualizer
  roomScaleHeight: number; // height in inches for AR visualizer
}

export const ARTWORKS_DATA: Artwork[] = [
  {
    id: "art-1",
    title: "Celestial Nebulae & Burnished Gold",
    artist: {
      name: "Evelyn Thorne",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      nationality: "British / French",
      verified: true,
    },
    medium: "Oil",
    style: "Abstract",
    dimensions: "48 x 36 in (122 x 91 cm)",
    yearCreated: 2025,
    price: 8400,
    imageUrl: "/artworks/art1.jpg",
    certificateHash: "0x89A...F41D",
    description: "Layered oil impasto combined with 24k burnished gold leaf on linen. Explores cosmic fluid dynamics and shimmering metallic textures under direct light.",
    isFeatured: true,
    provenance: [
      "Acquired directly from Artist's Studio, London (2025)",
      "Exhibited at Saatchi Gallery Summer Curation (2025)",
      "Certificate of Authenticity verified on Supabase Blockchain Registry"
    ],
    roomScaleWidth: 48,
    roomScaleHeight: 36,
  },
  {
    id: "art-2",
    title: "Venetian Twilight Canal Reflection",
    artist: {
      name: "Marcus Vance",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      nationality: "Italian / American",
      verified: true,
    },
    medium: "Oil",
    style: "Impressionism",
    dimensions: "40 x 30 in (101 x 76 cm)",
    yearCreated: 2024,
    price: 6200,
    imageUrl: "/artworks/art2.jpg",
    certificateHash: "0x43B...9E02",
    description: "Vibrant palette knife impressionism portraying warm street lamps casting liquid cadmium orange and violet reflections across Venice's historic waters.",
    isFeatured: true,
    provenance: [
      "Galleria d'Arte Moderna, Florence (2024)",
      "Private Collection, Milan (2024-2026)"
    ],
    roomScaleWidth: 40,
    roomScaleHeight: 30,
  },
  {
    id: "art-3",
    title: "Melancholia in Charcoal & Obsidian",
    artist: {
      name: "Sora Takahashi",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
      nationality: "Japanese",
      verified: true,
    },
    medium: "Charcoal",
    style: "Expressionism",
    dimensions: "60 x 40 in (152 x 101 cm)",
    yearCreated: 2026,
    price: 11500,
    imageUrl: "/artworks/art3.jpg",
    certificateHash: "0x77C...11A3",
    description: "Monumental expressive portrait blending raw charcoal linework with deep crimson oil glazes. Captures raw introspective emotional depth.",
    isFeatured: true,
    provenance: [
      "Tokyo Biennial Contemporary Selection (2026)",
      "Direct Atelier Masterpiece Record #88"
    ],
    roomScaleWidth: 60,
    roomScaleHeight: 40,
  },
  {
    id: "art-4",
    title: "Luminescent Botanical Sculpture",
    artist: {
      name: "Astrid Lindholm",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
      nationality: "Swedish",
      verified: true,
    },
    medium: "Acrylic",
    style: "Surrealism",
    dimensions: "36 x 36 in (91 x 91 cm)",
    yearCreated: 2025,
    price: 5900,
    imageUrl: "/artworks/art4.jpg",
    certificateHash: "0x91F...33B9",
    description: "Dreamlike surrealist composition fusing glowing bioluminescent flora with classical marble sculpture fragments in soft misty turquoise and rose hues.",
    isFeatured: true,
    provenance: [
      "Nordic Contemporary Fine Art Triennial (2025)",
      "Certificate of Authenticity with Cryptographic Stamp"
    ],
    roomScaleWidth: 36,
    roomScaleHeight: 36,
  }
];

export const ARTISTS_DATA = [
  {
    name: "Evelyn Thorne",
    role: "Master Abstract Painter",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    bio: "Pioneer of texture-heavy gold leaf oil impasto. Exhibited internationally in London, Paris, and New York.",
    totalSales: "$420,000+",
    verified: true
  },
  {
    name: "Marcus Vance",
    role: "Impressionist Virtuoso",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    bio: "Renowned for romantic palette knife streetscapes and light physics capture across Mediterranean canals.",
    totalSales: "$310,000+",
    verified: true
  },
  {
    name: "Sora Takahashi",
    role: "Contemporary Expressionist",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    bio: "Combining traditional Sumi ink techniques with charcoal overlay and dramatic oil glazes.",
    totalSales: "$580,000+",
    verified: true
  }
];
