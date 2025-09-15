import { useContext } from "react";
import { Row } from "reactstrap";
import I18NextContext from "@/helper/i18NextContext";
import { useTranslation } from "@/app/i18n/client";
import { latestBlogSlider } from "../../data/SliderSettings";
import WrapperComponent from "../common/WrapperComponent";
import FeatureBlog from "../parisTheme/FeatureBlog";
import ThemeOptionContext from "@/helper/themeOptionsContext";

const OurBlog = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  return (
    <WrapperComponent classes={{ sectionClass: "section-lg-space" }} noRowCol>
      <div className="about-us-title text-center">
        <h4 className="text-content">{t("OurBlog")}</h4>
        <h2 className="center">{t("OurLatestBlog")}</h2>
      </div>
      <Row>
        <FeatureBlog classes={{ sliderClass: "col-12", sliderOption: latestBlogSlider }}/>
      </Row>
    </WrapperComponent>
  );
};

export default OurBlog;
