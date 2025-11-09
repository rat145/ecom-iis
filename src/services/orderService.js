// Order Service for Firestore
// src/services/orderService.js

import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  increment,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { runTransaction } from "firebase/firestore";
import { orderValidationSchema } from "@/utils/validation/schemas";

/**
 * Generate order number
 * @returns {number} Order number
 */
const generateOrderNumber = async () => {
  try {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, orderBy("order_number", "desc"), limit(1));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return 10000;
    }

    const lastOrder = snapshot.docs[0].data();
    return lastOrder.order_number + 1;
  } catch (error) {
    console.error("Error generating order number:", error);
    return Date.now(); // Fallback to timestamp
  }
};

/**
 * Create a new order
 * @param {string} userId - User ID
 * @param {Object} orderData - Order data
 * @returns {Promise<Object>} Created order
 */
export const createOrder = async (userId, orderData) => {
  try {
    // Validate input
    await orderValidationSchema.validate(orderData);

    return await runTransaction(db, async (transaction) => {
      // Generate order number
      const ordersRef = collection(db, "orders");
      const orderNumber = await generateOrderNumber();

      // Create order document
      const orderRef = doc(ordersRef);
      const newOrder = {
        order_number: orderNumber,
        consumer_id: userId,
        tax_total: orderData.tax_total || 0,
        shipping_total: orderData.shipping_total || 0,
        points_amount: orderData.points_amount || 0,
        wallet_balance: orderData.wallet_balance || 0,
        amount: orderData.amount,
        total: orderData.total,
        coupon_total_discount: orderData.coupon_total_discount || 0,
        payment_method: orderData.payment_method,
        payment_status: orderData.payment_status || "PENDING",
        store_id: orderData.store_id || "",
        billing_address: orderData.billing_address,
        shipping_address: orderData.shipping_address,
        delivery_description: orderData.delivery_description || "",
        delivery_interval: orderData.delivery_interval || null,
        order_status_id: orderData.order_status_id || "1",
        coupon_id: orderData.coupon_id || null,
        items: orderData.items || [],
        status: 1,
        delivered_at: null,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      };

      transaction.set(orderRef, newOrder);

      // Update product orders count for each item
      for (const item of orderData.items) {
        const productRef = doc(db, "products", item.product_id);
        transaction.update(productRef, {
          orders_count: increment(1),
        });
      }

      // Clear user's cart
      const cartRef = doc(db, "carts", userId);
      transaction.update(cartRef, {
        items: [],
        updated_at: serverTimestamp(),
      });

      return {
        id: orderRef.id,
        ...newOrder,
      };
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      throw new Error(`Validation failed: ${error.message}`);
    }
    console.error("Error creating order:", error);
    throw error;
  }
};

/**
 * Get user's orders
 * @param {string} userId - User ID
 * @param {Object} filters - Filter options
 * @returns {Promise<Array>} Array of orders
 */
export const getUserOrders = async (userId, filters = {}) => {
  try {
    const ordersRef = collection(db, "orders");
    let q = query(ordersRef, where("consumer_id", "==", userId));

    // Filter by status
    if (filters.status !== undefined) {
      q = query(q, where("status", "==", filters.status));
    }

    // Filter by payment status
    if (filters.payment_status) {
      q = query(q, where("payment_status", "==", filters.payment_status));
    }

    // Apply sorting
    q = query(q, orderBy("created_at", "desc"));

    // Apply limit
    if (filters.limit) {
      q = query(q, limit(filters.limit));
    }

    const querySnapshot = await getDocs(q);
    const orders = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      orders.push({
        id: doc.id,
        ...data,
        created_at: data.created_at?.toDate().toISOString(),
        updated_at: data.updated_at?.toDate().toISOString(),
        delivered_at: data.delivered_at?.toDate().toISOString(),
      });
    });

    return orders;
  } catch (error) {
    console.error("Error getting user orders:", error);
    throw error;
  }
};

/**
 * Get all orders (Admin only)
 * @param {Object} filters - Filter options
 * @returns {Promise<Array>} Array of orders
 */
export const getAllOrders = async (filters = {}) => {
  try {
    const ordersRef = collection(db, "orders");
    let q = query(ordersRef);

    // Filter by status
    if (filters.status !== undefined) {
      q = query(q, where("status", "==", filters.status));
    }

    // Filter by payment status
    if (filters.payment_status) {
      q = query(q, where("payment_status", "==", filters.payment_status));
    }

    // Filter by store
    if (filters.store_id) {
      q = query(q, where("store_id", "==", filters.store_id));
    }

    // Apply sorting
    q = query(q, orderBy("created_at", "desc"));

    // Apply limit
    if (filters.limit) {
      q = query(q, limit(filters.limit));
    }

    const querySnapshot = await getDocs(q);
    const orders = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      orders.push({
        id: doc.id,
        ...data,
        created_at: data.created_at?.toDate().toISOString(),
        updated_at: data.updated_at?.toDate().toISOString(),
        delivered_at: data.delivered_at?.toDate().toISOString(),
      });
    });

    return orders;
  } catch (error) {
    console.error("Error getting all orders:", error);
    throw error;
  }
};

/**
 * Get order by ID
 * @param {string} orderId - Order ID
 * @returns {Promise<Object>} Order data
 */
export const getOrderById = async (orderId) => {
  try {
    const orderDoc = await getDoc(doc(db, "orders", orderId));

    if (!orderDoc.exists()) {
      throw new Error("Order not found");
    }

    const data = orderDoc.data();
    return {
      id: orderDoc.id,
      ...data,
      created_at: data.created_at?.toDate().toISOString(),
      updated_at: data.updated_at?.toDate().toISOString(),
      delivered_at: data.delivered_at?.toDate().toISOString(),
    };
  } catch (error) {
    console.error("Error getting order:", error);
    throw error;
  }
};

/**
 * Update order status (Admin only)
 * @param {string} orderId - Order ID
 * @param {Object} updates - Updates to apply
 * @returns {Promise<Object>} Updated order
 */
export const updateOrder = async (orderId, updates) => {
  try {
    const orderRef = doc(db, "orders", orderId);

    const updatedData = {
      ...updates,
      updated_at: serverTimestamp(),
    };

    // If marking as delivered, set delivered_at timestamp
    if (
      updates.order_status_id === "5" ||
      updates.payment_status === "COMPLETED"
    ) {
      updatedData.delivered_at = serverTimestamp();
    }

    await updateDoc(orderRef, updatedData);

    return await getOrderById(orderId);
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};

/**
 * Cancel order
 * @param {string} orderId - Order ID
 * @param {string} userId - User ID (for verification)
 * @returns {Promise<Object>} Updated order
 */
export const cancelOrder = async (orderId, userId) => {
  try {
    const order = await getOrderById(orderId);

    // Verify user owns this order
    if (order.consumer_id !== userId) {
      throw new Error("Unauthorized to cancel this order");
    }

    // Check if order can be cancelled
    if (order.payment_status === "COMPLETED" || order.order_status_id === "5") {
      throw new Error("Cannot cancel completed or delivered orders");
    }

    return await updateOrder(orderId, {
      status: 0,
      order_status_id: "6", // Cancelled status
      payment_status: "CANCELLED",
    });
  } catch (error) {
    console.error("Error cancelling order:", error);
    throw error;
  }
};
