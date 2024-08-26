import { toastStyles } from "../../services/toast";
import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

const ErrorMessage = ({ message }) => {
  useEffect(() => {
    toast(message, toastStyles);
  }, [message]);
  return;
  <div>
    <Toaster position="top-center" reverseOrder={true} />
  </div>;
};

export default ErrorMessage;
