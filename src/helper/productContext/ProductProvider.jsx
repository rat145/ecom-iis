import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import request from "@/utils/axiosUtils";
import { ProductAPI } from "@/utils/axiosUtils/API";
import ProductContext from ".";

const ProductProvider = (props) => {
  const [customProduct, setCustomProduct] = useState([]);
  const [totalDealIds, setTotalDealIds] = useState("");
  const [productAPIData, setProductAPIData] = useState({ data: [], refetchProduct: "", params: { ...totalDealIds }, productIsLoading: false });
  const {
    data: productData,
    refetch: productRefetch,
    isLoading: productIsLoading,
  } = useQuery({
    queryKey: [ProductAPI],
    queryFn: () =>
      request({
        url: ProductAPI,
        params: {
          ...productAPIData.params,
          ids: totalDealIds,
          status: 1,
          paginate: Object.keys(totalDealIds).length > 5 ? Object.keys(totalDealIds).length : 5,
        },
      }),
    enabled: false,
    refetchOnWindowFocus: false,
    select: (data) => data.data,
  });

  useEffect(() => {
    if (productData) {
      setProductAPIData((prev) => ({ ...prev, data: productData, productIsLoading: productIsLoading }));
    }
  }, [productData]);
  return <ProductContext.Provider value={{ ...props, productAPIData, setProductAPIData, customProduct, setCustomProduct, totalDealIds, setTotalDealIds, productRefetch, productData }}>{props.children}</ProductContext.Provider>;
};
export default ProductProvider;
