import { useMutation } from "@tanstack/react-query";
import { useRouter, usePathname } from "next/navigation";
import request from "../axiosUtils";
import SuccessHandle from "../customFunctions/SuccessHandle";

const useCreate = (url, updateId, path = false, message, extraFunction, notHandler, setCouponError) => {
  const router = useRouter();
  const pathName = usePathname();
  return useMutation({
    mutationFn: (data) =>
      request({
        url: updateId ? `${url}/${Array.isArray(updateId) ? updateId.join("/") : updateId}` : url,
        data,
        method: "post",
      }),
    onSuccess: (resDta) => {
      !notHandler && SuccessHandle(resDta, router, path, message, setCouponError, pathName);
      extraFunction && extraFunction(resDta);
    },
    onError: (err) => {
      return err;
    },
  });
};

export default useCreate;
