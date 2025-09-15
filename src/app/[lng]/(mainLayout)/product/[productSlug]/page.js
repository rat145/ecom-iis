import ProductDetailContent from "@/components/productDetails"
export async function generateMetadata({ params }) {
    const { productSlug } = await params;
    // fetch data
    const productData = await fetch(`${process.env.API_PROD_URL}product/${productSlug}`).then((res) => res.json()).catch((err) => console.log("err", err))
    return {
        openGraph: {
            title: productData?.meta_title,
            description: productData?.meta_description,
            images: [productData?.product_meta_image?.original_url, []],
        },
    }
}

const ProductDetails = async({ params }) => {
    const { productSlug } = await params;
    return (
        <ProductDetailContent params={productSlug} />
    )
}

export default ProductDetails