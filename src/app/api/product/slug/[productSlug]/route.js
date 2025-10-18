// Product Detail API Route (by slug)
// src/app/api/product/slug/[productSlug]/route.js

import { NextResponse } from 'next/server';
import { collection, query, where, getDocs, limit, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '@/config/firebase.config';

export async function GET(request, { params }) {
  try {
    const { productSlug } = params;

    if (!productSlug) {
      return NextResponse.json(
        { error: 'Product slug is required' },
        { status: 400 }
      );
    }

    // Query product by slug
    const productsRef = collection(db, 'products');
    const q = query(
      productsRef,
      where('slug', '==', productSlug),
      where('status', '==', 1),
      limit(1)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const productDoc = querySnapshot.docs[0];
    const productData = productDoc.data();

    // Increment view count (fire and forget)
    try {
      const productRef = doc(db, 'products', productDoc.id);
      await updateDoc(productRef, {
        views_count: increment(1)
      });
    } catch (viewError) {
      console.error('Error incrementing views:', viewError);
      // Don't fail the request if view count update fails
    }

    // Format response
    const product = {
      id: productDoc.id,
      ...productData,
      created_at: productData.created_at?.toDate().toISOString(),
      updated_at: productData.updated_at?.toDate().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: product
    });

  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

