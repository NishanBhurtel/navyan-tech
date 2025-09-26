import { toast } from "react-toastify";

export function useAppToast() {
  const toastSuccess = (message: string) => {
    toast.success(`${message}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const toastError = (message: string) => {
    toast.error(`${message}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return { toastSuccess, toastError };
}
