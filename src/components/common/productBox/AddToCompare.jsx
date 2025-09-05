import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import Btn from "@/elements/buttons/Btn";
import CompareContext from "@/helper/compareContext";
import I18NextContext from "@/helper/i18NextContext";
import { RiRefreshLine } from "react-icons/ri";

const AddToCompare = ({ productObj, customClass }) => {
  const { i18Lang } = useContext(I18NextContext);
  const cookieUAT = Cookies.get("uat");
  const router = useRouter();
  const addToCompare = () => {
    if (!cookieUAT) {
      router.push(`/${i18Lang}/auth/login`);
    } else {
      // add compare logic
      router.push(`/${i18Lang}/compare`);
    }
  };

  return (
    <>
      {customClass ? (
        <Btn className={customClass ?? ""} onClick={addToCompare}>
          <RiRefreshLine />
        </Btn>
      ) : (
        <li title="Compare" onClick={addToCompare}>
          <a>
            <RiRefreshLine />
          </a>
        </li>
      )}
    </>
  );
};

export default AddToCompare;
