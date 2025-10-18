// Category API Route
// src/app/api/category/route.js

import { NextResponse } from 'next/server';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase.config';

/**
 * Build category tree structure
 */
const buildCategoryTree = (categories) => {
  const categoryMap = {};
  const tree = [];

  // Create a map of categories
  categories.forEach(category => {
    categoryMap[category.id] = { ...category, subcategories: [] };
  });

  // Build tree structure
  categories.forEach(category => {
    if (category.parent_id && categoryMap[category.parent_id]) {
      categoryMap[category.parent_id].subcategories.push(categoryMap[category.id]);
    } else {
      tree.push(categoryMap[category.id]);
    }
  });

  return tree;
};

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const queryType = searchParams.get('type');
    const queryParent = searchParams.get('parent_id');
    const queryTree = searchParams.get('tree');

    const categoriesRef = collection(db, 'categories');
    let q = query(categoriesRef);

    // Filter by status (only active categories)
    q = query(q, where('status', '==', 1));

    // Filter by type
    if (queryType) {
      q = query(q, where('type', '==', queryType));
    }

    // Filter by parent
    if (queryParent !== null && queryParent !== undefined) {
      if (queryParent === 'null' || queryParent === '') {
        q = query(q, where('parent_id', '==', null));
      } else {
        q = query(q, where('parent_id', '==', queryParent));
      }
    }

    // Apply sorting
    q = query(q, orderBy('name', 'asc'));

    // Execute query
    const querySnapshot = await getDocs(q);
    let categories = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      categories.push({
        id: doc.id,
        ...data,
        created_at: data.created_at?.toDate().toISOString(),
        updated_at: data.updated_at?.toDate().toISOString()
      });
    });

    // Build tree structure if requested
    if (queryTree === 'true' || queryTree === '1') {
      categories = buildCategoryTree(categories);
    }

    // Return data in the format expected by frontend
    return NextResponse.json({
      data: categories,
      total: categories.length
    });

  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

