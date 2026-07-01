import { supabase, isSupabaseConfigured } from './supabase';

// Fallback seed data — used when Supabase is not yet configured
export const SEED_PRODUCTS = [
  {
    id: '1',
    name: 'Red Tulip Bouquet',
    category: 'flower',
    price: 299,
    description: 'A vibrant bouquet of handmade red tulips, crafted with love and premium materials.',
    image_url: '/images/flowers/red-tulips.jpg',
    is_active: true,
    display_order: 1,
  },
  {
    id: '2',
    name: 'Mixed Rainbow Bouquet',
    category: 'flower',
    price: 449,
    description: 'A cheerful mix of colourful handcrafted tulips to brighten any room.',
    image_url: '/images/flowers/rainbow-tulips.jpg',
    is_active: true,
    display_order: 2,
  },
  {
    id: '3',
    name: 'Sunflower Gold Bouquet',
    category: 'flower',
    price: 399,
    description: 'Radiant handmade sunflowers that bring warmth and joy to your space.',
    image_url: '/images/flowers/sunflower-bouquet.jpg',
    is_active: true,
    display_order: 3,
  },
  {
    id: '4',
    name: 'Pink Tulip Bunch',
    category: 'flower',
    price: 349,
    description: 'Delicate pink tulips handcrafted with premium paper for lasting beauty.',
    image_url: '/images/flowers/pink-tulips.jpg',
    is_active: true,
    display_order: 4,
  },
  {
    id: '5',
    name: 'Lavender Lily Bouquet',
    category: 'flower',
    price: 350,
    description: 'Elegant lavender lilies that add a touch of sophistication to any setting.',
    image_url: '/images/flowers/lavender-lily.jpg',
    is_active: true,
    display_order: 5,
  },
  {
    id: '6',
    name: 'Velvet Burgundy Blooms',
    category: 'flower',
    price: 550,
    description: 'Luxurious velvet-finish blooms in rich burgundy tones — our premium collection.',
    image_url: '/images/flowers/velvet-blooms.jpg',
    is_active: true,
    display_order: 6,
  },
  {
    id: '7',
    name: 'Handmade Flower Keychains',
    category: 'keychain',
    price: 149,
    description: 'Adorable miniature flower keychains — perfect gifts for any occasion.',
    image_url: '/images/keychains/keychain-collection.jpg',
    is_active: true,
    display_order: 7,
  },
];

/**
 * Fetch products from Supabase if configured, otherwise return seed data.
 * @param {string|null} category - 'flower', 'keychain', or null for all
 */
export async function getProducts(category = null) {
  if (isSupabaseConfigured) {
    let query = supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.warn('Supabase fetch failed, using seed data:', error.message);
      return filterByCategory(SEED_PRODUCTS, category);
    }

    return data;
  }

  return filterByCategory(SEED_PRODUCTS, category);
}

function filterByCategory(products, category) {
  if (!category) return products.filter((p) => p.is_active);
  return products.filter((p) => p.is_active && p.category === category);
}
