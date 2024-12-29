import { useSearchParams } from "react-router-dom";
import { verifyPayment } from "../../utils/api_payment";
import { useEffect } from "react";

function PaymentVerify() {
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
      console.log(updatedOrder);
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
