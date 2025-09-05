import SingleBlog from "@/components/blogs/singleBlog";
export async function generateMetadata({ params }) {
  const { blogSlug } = await params;
  // fetch data
  const blogData = await fetch(`${process.env.API_PROD_URL}blog/slug/${blogSlug}`)
    .then((res) => res.json())
    .catch((err) => console.log("err", err));
  return {
    openGraph: {
      title: blogData?.meta_title,
      description: blogData?.meta_description,
      images: [blogData?.blog_meta_image?.original_url, []],
    },
  };
}

const BlogDetailContent = async ({ params }) => {
  const { blogSlug } = await params;
  return <>{params && <SingleBlog params={blogSlug} />}</>;
};

export default BlogDetailContent;
