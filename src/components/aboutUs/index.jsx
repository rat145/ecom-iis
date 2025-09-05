"use client";
import { useContext } from "react";
import Breadcrumb from "../common/Breadcrumb";
import WrapperComponent from "../common/WrapperComponent";
import AboutUsImage from "./AboutUsImage";
import AboutUsText from "./AboutUsText";
import ClientSection from "./ClientSection";
import CreativeTeam from "./CreativeTeam";
import OurBlog from "./OurBlog";
import ReviewSection from "./ReviewSection";
import ThemeOptionContext from "@/helper/themeOptionsContext";

const AboutUsContent = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  return (
    <>
     <Breadcrumb title={"AboutUs"} subNavigation={[{ name: "AboutUs" }]} />
      <WrapperComponent classes={{ sectionClass: 'fresh-vegetable-section section-lg-space', row: 'gx-xl-5 gy-xl-0 g-3 ratio_148_1' }}  customCol>
        <AboutUsImage/>
        <AboutUsText />
      </WrapperComponent>
      <ClientSection />
      <CreativeTeam />
      <ReviewSection />
      <OurBlog />
    </>
  );
};

export default AboutUsContent;
