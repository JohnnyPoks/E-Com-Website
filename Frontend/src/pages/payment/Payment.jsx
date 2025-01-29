import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { useSelector } from "react-redux";
import Image from "../../components/designLayouts/Image";
import { useState } from "react";
import Api from "../../utils/Api";

const Payment = () => {
  const userInfo = useSelector((state) => state.orebiReducer.userInfo);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [name, setName] = useState(userInfo.details.fullName);
  const [number, setNumber] = useState(userInfo.details.phoneNumber);
  const [amt, setAmt] = useState(localStorage.getItem("amount"));


  const handlePayment = async () => {
    if (userInfo.isLogin) {
      const { statusCode, data } = await Api.postRequest("/api/payment", {
        amount: Number(amt),
        phone: number,
      });
      console.log(statusCode)
      console.log(JSON.parse(data));

      if (selectedPaymentMethod) {
        alert("Payment Successful using " + selectedPaymentMethod);
      } else {
        alert("Please select a payment method.");
      }
    } else {
      alert("Please Login");
    }
  };

  const handleMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Payment gateway" />
      <form
        action="#"
        className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:max-w-xl lg:p-8"
      >
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1">
            <label
              htmlFor="full_name"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Full name*
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="full_name"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
              placeholder="Bonnie Green"
              required
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <label
              htmlFor="phone-number-input"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Phone number*
            </label>
            <input
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              type="text"
              id="phone-number-input"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
              placeholder="677787980"
              pattern="\d{9}"
              required
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <label
              htmlFor="amount-input"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Amount you will to pay*
            </label>
            <div className="relative">
              <input
                value={amt}
                onChange={(e) => setAmt(e.target.value)}
                contentEditable="false"
                id="amount-input"
                type="text"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>
          </div>

          <div className="col-span-2 md:col-span-1">
            <p className="mb-2 block text-sm font-medium text-gray-900">
              Select payment method*
            </p>
            <div className="flex gap-8 items-center justify-center">
              <label
                className={`cursor-pointer ${
                  selectedPaymentMethod === "MTN"
                    ? "border-2 border-blue-500 rounded"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="MTN"
                  checked={selectedPaymentMethod === "MTN"}
                  onChange={() => handleMethodSelect("MTN")}
                  className="hidden"
                />
                <Image
                  imgSrc="https://www.primenewsghana.com/images/2020/jun/11/MTN-MOMO.jpg"
                  className="h-20 w-auto"
                />
              </label>
              <label
                className={`cursor-pointer ${
                  selectedPaymentMethod === "Orange"
                    ? "border-2 border-blue-500 rounded"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Orange"
                  checked={selectedPaymentMethod === "Orange"}
                  onChange={() => handleMethodSelect("Orange")}
                  className="hidden"
                />
                <Image
                  imgSrc="https://cdn.kulturegeek.fr/wp-content/uploads/2016/06/Orange-Money-Logo-600x388.jpg"
                  className="h-20 w-auto"
                />
              </label>
            </div>
          </div>
        </div>

        <button
          onClick={handlePayment}
          type="submit"
          className="flex w-full items-center justify-center rounded-lg bg-primeColor px-5 py-2.5 text-lg font-medium text-white hover:bg-black duration-300"
        >
          Pay now
        </button>
      </form>

      <div className="pb-10">
        <Link to="/shop">
          <button className="w-52 h-10 bg-primeColor text-white text-lg mt-4 hover:bg-black duration-300">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Payment;
