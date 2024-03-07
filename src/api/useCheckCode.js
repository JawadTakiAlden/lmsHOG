import { useMutation } from "@tanstack/react-query";
import { request } from "./request";
import { useSnackbar } from "notistack";

const useCheckCode = () => {
    const { enqueueSnackbar } = useSnackbar();
  const checkCodeRequest = (data) => {
    return request({
        url : '/activationCodes/checkCode',
        method : 'post',
        data
    })
  };
  const mutation = useMutation({
    mutationKey: ["check-code"],
    mutationFn: checkCodeRequest,
    onError: (error) => {
      if (error.response) {
        enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      }
    },
  });
  const callMutateFuncction = (values) => {
    mutation.mutate(values);
  };

  return {
    callFuntion: callMutateFuncction,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    mutation : mutation
  };
};

export default useCheckCode;
