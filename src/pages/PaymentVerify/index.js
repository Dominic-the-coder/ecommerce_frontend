import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyPayment } from "../../utils/api_payment";
import { useEffect } from "react";
import { toast } from "sonner";
import { clearCart } from "../../utils/api_cart";

function PaymentVerify() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const billplz_id = searchParams.get("billplz[id]");
  const billplz_paid = searchParams.get("billplz[paid]");
  const billplz_paid_at = searchParams.get("billplz[paid_at]");
  const billplz_x_signature = searchParams.get("billplz[x_signature]");

  useEffect(() => {
    verifyPayment(
      billplz_id,
      billplz_paid,
      billplz_paid_at,
      billplz_x_signature
    ).then((updatedOrder) => {
      // check if the order is paid or not
      // if it's paid, show the success message
      if (updatedOrder.status === "paid") {
        toast.success("Payment is successful");
      }
      // if it's failed, show the failed message
      if (updatedOrder.status === "failed") {
        toast.error("Payment failed");
      }

      // clear the cart
      clearCart();

      // redirect the user to /orders page
      navigate("/orders");
    });
  }, []);

  return (
    <>
      We're verifying your payment. Please don't click the go back button or
      close the browser.
    </>
  );
}
export default PaymentVerify;
