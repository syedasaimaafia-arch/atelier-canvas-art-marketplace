import { db } from '../frontend/src/lib/db';
import { users, artists, artworks } from './schema';
import * as dotenv from 'dotenv';

dotenv.config();

async function seedDatabase() {
  console.log('🌱 Seeding Supabase database via Drizzle ORM...');

  try {
    // 1. Insert Artist User Profile
    const [insertedUser] = await db.insert(users).values({
      name: 'Evelyn Thorne',
      email: 'evelyn.thorne@ateliercanvas.com',
      role: 'artist',
      bio: 'Pioneer of texture-heavy gold leaf oil impasto.',
    }).onConflictDoNothing().returning();

    // 2. Insert Artist Entry
    const [insertedArtist] = await db.insert(artists).values({
      name: 'Evelyn Thorne',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      bio: 'Pioneer of texture-heavy gold leaf oil impasto. Exhibited internationally in London, Paris, and New York.',
      nationality: 'British / French',
      bornYear: 1988,
      exhibitionsCount: 14,
      verified: true,
    }).onConflictDoNothing().returning();

    if (insertedArtist) {
      // 3. Insert Artworks
      await db.insert(artworks).values([
        {
          title: 'Celestial Nebulae & Burnished Gold',
          description: 'Layered oil impasto combined with 24k burnished gold leaf on linen. Explores cosmic fluid dynamics and shimmering metallic textures.',
          artistId: insertedArtist.id,
          medium: 'Oil',
          style: 'Abstract',
          dimensions: '48 x 36 in (122 x 91 cm)',
          yearCreated: 2025,
          price: '8400.00',
          imageUrl: '/artworks/art1.jpg',
          certificateHash: '0x89AF41D',
          isFeatured: true,
        },
        {
          title: 'Venetian Twilight Canal Reflection',
          description: 'Vibrant palette knife impressionism portraying warm street lamps casting liquid cadmium orange and violet reflections across Venice waters.',
          artistId: insertedArtist.id,
          medium: 'Oil',
          style: 'Impressionism',
          dimensions: '40 x 30 in (101 x 76 cm)',
          yearCreated: 2024,
          price: '6200.00',
          imageUrl: '/artworks/art2.jpg',
          certificateHash: '0x43B9E02',
          isFeatured: true,
        }
      ]);
    }

    console.log('✅ Supabase database seed completed successfully!');
  } catch (error) {
    console.error('Seed notice:', error);
  }
}

seedDatabase().then(() => process.exit(0));
