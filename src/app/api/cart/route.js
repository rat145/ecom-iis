// Cart API Route
// src/app/api/cart/route.js

import { NextResponse } from 'next/server';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, arrayUnion } from 'firebase/firestore';
import { db, auth } from '@/config/firebase.config';

/**
 * GET - Get user's cart
 */
export async function GET(request) {
  try {
    const user = auth.currentUser;
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const cartDoc = await getDoc(doc(db, 'carts', user.uid));
    
    if (!cartDoc.exists()) {
      return NextResponse.json({
        success: true,
        data: {
          user_id: user.uid,
          items: []
        }
      });
    }

    const cartData = cartDoc.data();

    return NextResponse.json({
      success: true,
      data: {
        ...cartData,
        updated_at: cartData.updated_at?.toDate().toISOString()
      }
    });

  } catch (error) {
    console.error('Error getting cart:', error);
    return NextResponse.json(
      { error: 'Failed to get cart' },
      { status: 500 }
    );
  }
}

/**
 * POST - Add item to cart
 */
export async function POST(request) {
  try {
    const user = auth.currentUser;
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { product_id, variation_id, quantity, price } = await request.json();

    if (!product_id || !quantity || !price) {
      return NextResponse.json(
        { error: 'Product ID, quantity, and price are required' },
        { status: 400 }
      );
    }

    const cartRef = doc(db, 'carts', user.uid);
    const cartDoc = await getDoc(cartRef);

    const cartItem = {
      product_id,
      variation_id: variation_id || null,
      quantity: parseInt(quantity),
      price: parseFloat(price)
    };

    if (!cartDoc.exists()) {
      // Create new cart
      await setDoc(cartRef, {
        user_id: user.uid,
        items: [cartItem],
        updated_at: serverTimestamp()
      });
    } else {
      // Update existing cart
      const cartData = cartDoc.data();
      const existingItems = cartData.items || [];
      
      // Check if item already exists
      const existingItemIndex = existingItems.findIndex(
        i => i.product_id === cartItem.product_id && 
             i.variation_id === cartItem.variation_id
      );

      if (existingItemIndex > -1) {
        // Update quantity
        existingItems[existingItemIndex].quantity += cartItem.quantity;
        await updateDoc(cartRef, {
          items: existingItems,
          updated_at: serverTimestamp()
        });
      } else {
        // Add new item
        await updateDoc(cartRef, {
          items: arrayUnion(cartItem),
          updated_at: serverTimestamp()
        });
      }
    }

    // Get updated cart
    const updatedCartDoc = await getDoc(cartRef);
    const updatedCartData = updatedCartDoc.data();

    return NextResponse.json({
      success: true,
      message: 'Item added to cart',
      data: {
        ...updatedCartData,
        updated_at: updatedCartData.updated_at?.toDate().toISOString()
      }
    });

  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json(
      { error: 'Failed to add item to cart' },
      { status: 500 }
    );
  }
}

/**
 * PUT - Update cart item quantity
 */
export async function PUT(request) {
  try {
    const user = auth.currentUser;
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { product_id, variation_id, quantity } = await request.json();

    if (!product_id || quantity === undefined) {
      return NextResponse.json(
        { error: 'Product ID and quantity are required' },
        { status: 400 }
      );
    }

    const cartRef = doc(db, 'carts', user.uid);
    const cartDoc = await getDoc(cartRef);

    if (!cartDoc.exists()) {
      return NextResponse.json(
        { error: 'Cart not found' },
        { status: 404 }
      );
    }

    const cartData = cartDoc.data();
    const items = cartData.items || [];
    
    const itemIndex = items.findIndex(
      i => i.product_id === product_id && i.variation_id === (variation_id || null)
    );

    if (itemIndex === -1) {
      return NextResponse.json(
        { error: 'Item not found in cart' },
        { status: 404 }
      );
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      items.splice(itemIndex, 1);
    } else {
      // Update quantity
      items[itemIndex].quantity = parseInt(quantity);
    }

    await updateDoc(cartRef, {
      items: items,
      updated_at: serverTimestamp()
    });

    // Get updated cart
    const updatedCartDoc = await getDoc(cartRef);
    const updatedCartData = updatedCartDoc.data();

    return NextResponse.json({
      success: true,
      message: 'Cart updated',
      data: {
        ...updatedCartData,
        updated_at: updatedCartData.updated_at?.toDate().toISOString()
      }
    });

  } catch (error) {
    console.error('Error updating cart:', error);
    return NextResponse.json(
      { error: 'Failed to update cart' },
      { status: 500 }
    );
  }
}

/**
 * DELETE - Remove item from cart
 */
export async function DELETE(request) {
  try {
    const user = auth.currentUser;
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('product_id');
    const variationId = searchParams.get('variation_id');

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const cartRef = doc(db, 'carts', user.uid);
    const cartDoc = await getDoc(cartRef);

    if (!cartDoc.exists()) {
      return NextResponse.json(
        { error: 'Cart not found' },
        { status: 404 }
      );
    }

    const cartData = cartDoc.data();
    const items = cartData.items || [];
    
    const updatedItems = items.filter(
      i => !(i.product_id === productId && i.variation_id === (variationId || null))
    );

    await updateDoc(cartRef, {
      items: updatedItems,
      updated_at: serverTimestamp()
    });

    // Get updated cart
    const updatedCartDoc = await getDoc(cartRef);
    const updatedCartData = updatedCartDoc.data();

    return NextResponse.json({
      success: true,
      message: 'Item removed from cart',
      data: {
        ...updatedCartData,
        updated_at: updatedCartData.updated_at?.toDate().toISOString()
      }
    });

  } catch (error) {
    console.error('Error removing from cart:', error);
    return NextResponse.json(
      { error: 'Failed to remove item from cart' },
      { status: 500 }
    );
  }
}

