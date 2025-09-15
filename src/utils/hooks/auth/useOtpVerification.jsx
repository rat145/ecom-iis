import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import request from "../../axiosUtils";
import { VerifyTokenAPI } from "../../axiosUtils/API";
import { ToastNotification } from "../../customFunctions/ToastNotification";

const useOtpVerification = () => {
  const router = useRouter();
  return useMutation({mutationFn: (data) => request({ url: VerifyTokenAPI, method: "post", data }),
    onSuccess: (responseData, requestData) => {
      if (responseData.status === 200) {
        Cookies.set('uo', requestData?.token)
        router.push("/auth/update-password");
        ToastNotification("success", responseData.data.message);
      }
    },
  });
};
export default useOtpVerification;
