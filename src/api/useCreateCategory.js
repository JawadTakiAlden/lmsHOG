import { useMutation } from "@tanstack/react-query";
import { request } from "./request";
import { useSnackbar } from "notistack";

const createCategoryRequest = (values) => {
  return request({
    url: "/categories/create",
    method: "post",
    data: values,
  });
};
const useCreateCategory = () => {
    const {enqueueSnackbar} =useSnackbar()
  const query = useMutation({
    mutationKey: ["create-category"],
    mutationFn: createCategoryRequest,
    onSuccess: (data) => {
      enqueueSnackbar(data?.data?.message, { variant: "success" });
    },
    onError: (error) => {
      if (error.response) {
        enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      }
    },
  });

  const callMutateFuncction = (options) => {
    query.mutate(options);
  };

  return {
    callFuntion: callMutateFuncction,
    isPending: query.isPending,
    isSuccess: query.isSuccess,
  };
};

export default useCreateCategory;
