"use client";
import I18NextContext from "@/helper/i18NextContext";
import ThemeOptionContext from "@/helper/themeOptionsContext";
import { usePathname } from "next/navigation";
import { useContext, useMemo } from "react";
import { headerOptionsMap } from "../../data/Layout";
import StandardHeader from "./widgets/StandardHeader";
import MinimalHeader from "./widgets/MinimalHeader";
import BasicHeader from "./widgets/BasicHeader";
import ClassicHeader from "./widgets/ClassicHeader";

const MainHeader = () => {
  const pathName = usePathname();
  const { i18Lang } = useContext(I18NextContext);
  let currentPath = pathName.split(`/${i18Lang}`)[1];
  const { themeOption } = useContext(ThemeOptionContext);
  const headerList = {
    basic_header: <BasicHeader />,
    classic_header: <ClassicHeader />,
    minimal_header: <MinimalHeader />,
    standard_header: <StandardHeader />,
  };
  const showHeader = useMemo(() => {
    return headerOptionsMap[currentPath] || themeOption?.header?.header_options;
  }, [pathName, themeOption?.header?.header_options]);
  return headerList[showHeader] || <BasicHeader />;
};

export default MainHeader;