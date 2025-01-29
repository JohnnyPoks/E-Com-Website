import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../../redux/orebiSlice";
import Api from "../../../utils/Api";

const ProductInfo = ({ productInfo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.orebiReducer.userInfo);
  const cartInfo = useSelector((state) => state.orebiReducer.products);

  const handleApiRequests = async ({ productId, quantity }) => {
    const { statusCode, data } = await Api.postRequest("/api/cart", {
      userId: userInfo.details._id,
      productId: productId,
      productName: productInfo.productName,
      count: quantity,
    });
    console.log(statusCode, JSON.parse(data));
    return { statusCode, results: JSON.parse(data) };
  };

  const handleAddToCartClick = async () => {
    if (userInfo.isLogin) {
      const productExists = cartInfo.find(
        (item) => item._id === productInfo._id
      );

      let info;

      if (productExists) {
        info = await handleApiRequests({
          productId: productInfo._id,
          quantity: productExists.quantity + 1,
        });
        info.statusCode === 201 &&
          alert(
            `${productInfo.productName} quantity updated to ${
              productExists.quantity + 1
            }`
          );
      } else {
        info = await handleApiRequests({
          productId: productInfo._id,
          quantity: 1,
        });
        info.statusCode === 201 &&
          alert(`${productInfo.productName} added to cart`);
      }

      info &&
        info.statusCode === 201 &&
        info.results.status === "ok" &&
        dispatch(
          addToCart({
            _id: productInfo._id,
            name: productInfo.productName,
            quantity: 1,
            image: productInfo.img,
            badge: productInfo.badge,
            price: productInfo.price,
            colors: productInfo.color,
          })
        );

      if (info && info.statusCode !== 201) {
        navigate("/signin");
        alert(`${info.results.message}. You have to sign in`);
      }
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">{productInfo.productName}</h2>
      <p className="text-xl font-semibold">${productInfo.price}</p>
      <p className="text-base text-gray-600">{productInfo.des}</p>
      <p className="text-sm">Be the first to leave a review.</p>
      <p className="font-medium text-lg">
        <span className="font-normal">Colors:</span> {productInfo.color}
      </p>
      <button
        onClick={handleAddToCartClick}
        className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
      >
        Add to Cart
      </button>
      <p className="font-normal text-sm">
        <span className="text-base font-medium"> Categories:</span> Spring
        collection, Streetwear, Women Tags: featured SKU: N/A
      </p>
    </div>
  );
};

export default ProductInfo;
