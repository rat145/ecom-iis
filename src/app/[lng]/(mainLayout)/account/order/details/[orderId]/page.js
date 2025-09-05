import OrderDetailsContain from "@/components/account/orders/details"

export default async function OrderDetails({ params }) {
  const { orderId } = await params;

  return (
    <>
      {orderId && <OrderDetailsContain params={orderId} />}
    </>
  );
}
