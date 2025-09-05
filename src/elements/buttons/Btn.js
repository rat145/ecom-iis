import { useContext } from "react";
import { Button } from "reactstrap";
import I18NextContext from "@/helper/i18NextContext";
import { useTranslation } from "@/app/i18n/client";

const Btn = (props) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');

  const { loading, title, children, ...rest } = props;

  return (
    <Button {...rest}>
      {loading ? (
        <div className={`d-flex position-relative${loading ? " spinning" : ""}`}>
          {children}
          {t(title)}
        </div>
      ) : (
        <>
          {children}
          {t(title)}
        </>
      )}
    </Button>
  );
};

export default Btn;
