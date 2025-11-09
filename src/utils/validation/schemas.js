import * as Yup from "yup";

export const productValidationSchema = Yup.object({
  name: Yup.string().required("Product name is required").min(3).max(200),
  description: Yup.string().required("Description is required"),
  sale_price: Yup.number().required("Price is required").min(0),
  quantity: Yup.number().required("Quantity is required").min(0),
  category_ids: Yup.array().min(1, "At least one category is required"),
  status: Yup.number().oneOf([0, 1]),
});

export const orderValidationSchema = Yup.object({
  billing_address: Yup.object().required("Billing address is required"),
  shipping_address: Yup.object().required("Shipping address is required"),
  payment_method: Yup.string().required("Payment method is required"),
  items: Yup.array().min(1, "Order must have at least one item"),
});

export const reviewValidationSchema = Yup.object({
  product_id: Yup.string().required("Product ID is required"),
  rating: Yup.number().required("Rating is required").min(1).max(5),
  comment: Yup.string().max(1000),
});
