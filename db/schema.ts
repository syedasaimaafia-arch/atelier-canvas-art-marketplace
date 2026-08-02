import { pgTable, text, timestamp, integer, decimal, boolean, uuid, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  image: text('image'),
  role: varchar('role', { length: 20 }).default('collector').notNull(), // collector, artist, admin
  bio: text('bio'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const artists = pgTable('artists', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  name: text('name').notNull(),
  avatarUrl: text('avatar_url').notNull(),
  bio: text('bio').notNull(),
  nationality: text('nationality'),
  bornYear: integer('born_year'),
  exhibitionsCount: integer('exhibitions_count').default(0),
  verified: boolean('verified').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const artworks = pgTable('artworks', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  artistId: uuid('artist_id').references(() => artists.id).notNull(),
  medium: varchar('medium', { length: 50 }).notNull(), // Oil, Acrylic, Watercolor, Mixed Media, Charcoal
  style: varchar('style', { length: 50 }).notNull(), // Impressionism, Abstract, Expressionism, Surrealism, Realism
  dimensions: varchar('dimensions', { length: 50 }).notNull(), // e.g. "48 x 36 in (122 x 91 cm)"
  yearCreated: integer('year_created').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  status: varchar('status', { length: 20 }).default('available').notNull(), // available, reserved, sold
  imageUrl: text('image_url').notNull(),
  certificateHash: text('certificate_hash').notNull(),
  isFeatured: boolean('is_featured').default(false),
  viewCount: integer('view_count').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const inquiries = pgTable('inquiries', {
  id: uuid('id').defaultRandom().primaryKey(),
  artworkId: uuid('artwork_id').references(() => artworks.id).notNull(),
  buyerName: text('buyer_name').notNull(),
  buyerEmail: text('buyer_email').notNull(),
  offerPrice: decimal('offer_price', { precision: 10, scale: 2 }),
  message: text('message').notNull(),
  status: varchar('status', { length: 20 }).default('pending'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
