import PagesContent from '@/components/pages/PagesContent'

export async function generateMetadata({ params }) {
    const { slug } = await params;
    // fetch data
    const pagesData = await fetch(`${process.env.API_PROD_URL}page/slug/${slug}`).then((res) => res.json()).catch((err) => console.log("err", err))
    return {
        openGraph: {
            title: pagesData?.meta_title,
            description: pagesData?.meta_description,
            images: [
                {
                    url: pagesData?.page_meta_image?.original_url,
                    width: 1200,
                    height: 600,
                },
                {
                    url: '../../../../../../public/assets/images/logo.png',
                    width: 1200,
                    height: 600,
                }
            ]
        },
    }
}
const Pages = ({ params }) => {
  const { slug } = params;
  return params && <PagesContent params={slug} />;
};

export default Pages;