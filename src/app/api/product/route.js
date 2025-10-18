// Product List API Route
// src/app/api/product/route.js

import { NextResponse } from 'next/server';
import { collection, query, where, orderBy, getDocs, limit } from 'firebase/firestore';
import { db } from '@/config/firebase.config';

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const queryCategory = searchParams.get('category');
    const querySortBy = searchParams.get('sortBy');
    const querySearch = searchParams.get('search');
    const queryLimit = searchParams.get('limit');
    const queryStoreId = searchParams.get('store_id');
    const queryFeatured = searchParams.get('featured');
    const queryTrending = searchParams.get('trending');

    const productsRef = collection(db, 'products');
    let q = query(productsRef);

    // Filter by status (only active products)
    q = query(q, where('status', '==', 1));
    q = query(q, where('is_approved', '==', 1));

    // Filter by category
    if (queryCategory) {
      const categories = queryCategory.split(',');
      q = query(q, where('category_ids', 'array-contains-any', categories));
    }

    // Filter by store
    if (queryStoreId) {
      q = query(q, where('store_id', '==', queryStoreId));
    }

    // Filter by featured
    if (queryFeatured === 'true' || queryFeatured === '1') {
      q = query(q, where('is_featured', '==', 1));
    }

    // Filter by trending
    if (queryTrending === 'true' || queryTrending === '1') {
      q = query(q, where('is_trending', '==', 1));
    }

    // Apply sorting
    if (querySortBy === 'low-high') {
      q = query(q, orderBy('sale_price', 'asc'));
    } else if (querySortBy === 'high-low') {
      q = query(q, orderBy('sale_price', 'desc'));
    } else if (querySortBy === 'a-z') {
      q = query(q, orderBy('name', 'asc'));
    } else if (querySortBy === 'z-a') {
      q = query(q, orderBy('name', 'desc'));
    } else if (querySortBy === 'asc') {
      q = query(q, orderBy('created_at', 'asc'));
    } else if (querySortBy === 'desc') {
      q = query(q, orderBy('created_at', 'desc'));
    } else {
      // Default sorting by creation date (newest first)
      q = query(q, orderBy('created_at', 'desc'));
    }

    // Apply limit
    if (queryLimit) {
      q = query(q, limit(parseInt(queryLimit)));
    }

    // Execute query
    const querySnapshot = await getDocs(q);
    let products = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      products.push({
        id: doc.id,
        ...data,
        // Convert Firestore Timestamp to ISO string
        created_at: data.created_at?.toDate().toISOString(),
        updated_at: data.updated_at?.toDate().toISOString()
      });
    });

    // Client-side search filter
    if (querySearch) {
      const searchTerm = querySearch.toLowerCase();
      products = products.filter(product =>
        product.name?.toLowerCase().includes(searchTerm) ||
        product.short_description?.toLowerCase().includes(searchTerm) ||
        product.description?.toLowerCase().includes(searchTerm)
      );
    }

    // Return data in the format expected by frontend
    return NextResponse.json({
      data: products,
      total: products.length
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // This endpoint is for admin only - product creation
    // Will be implemented in admin panel
    return NextResponse.json(
      { error: 'Method not allowed on this endpoint' },
      { status: 405 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

