import MainLayout from "@/layout";

export default async function RootLayout({ children, params }) {
  const { lng } = await params;

  return (
    <>
      <MainLayout lng={lng}>
        {children}
      </MainLayout>
    </>
  );
}
