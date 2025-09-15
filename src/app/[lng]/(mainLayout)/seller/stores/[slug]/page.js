import SingleStoreDetail from "@/components/seller/stores/singleStoreDetail"

const SellerStoreDetail = ({ params }) => {
    const { slug } = params;
    return (
        <SingleStoreDetail params={slug} />
    )
}
export default SellerStoreDetail