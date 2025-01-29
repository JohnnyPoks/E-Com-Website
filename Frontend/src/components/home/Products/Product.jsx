import { BsSuitHeartFill } from "react-icons/bs";
import { GiReturnArrow } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import Api from "../../../utils/Api";

const Product = (props) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.orebiReducer.userInfo);
  const cartInfo = useSelector((state) => state.orebiReducer.products);

  const _id = props.productName;
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);

  const navigate = useNavigate();
  const productItem = props;
  const handleProductDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        item: productItem,
      },
    });
  };

  const handleApiRequests = async ({ productId, quantity }) => {
    const { statusCode, data } = await Api.postRequest("/api/cart", {
      userId: userInfo.details._id,
      productId: productId,
      productName: props.productName,
      count: quantity,
    });
    console.log(statusCode, JSON.parse(data));
    return { statusCode, results: JSON.parse(data) };
  };

  const handleAddToCartClick = async () => {
    console.log("Clicked");

    if (userInfo.isLogin) {
      const productExists = cartInfo.find((item) => item._id === props._id);
      let info;

      console.log(productExists);

      if (productExists) {
        info = await handleApiRequests({
          productId: props._id,
          quantity: productExists.quantity + 1,
        });
        info.statusCode === 201 &&
          alert(
            `${props.productName} quantity updated to ${
              productExists.quantity + 1
            }`
          );
      } else {
        info = await handleApiRequests({ productId: props._id, quantity: 1 });
        info.statusCode === 201 && alert(`${props.productName} added to cart`);
      }

      console.log(info.statusCode, info.results);

      info &&
        info.statusCode === 201 &&
        info.results.status === "ok" &&
        dispatch(
          addToCart({
            _id: props._id,
            name: props.productName,
            quantity: 1,
            image: props.img,
            badge: props.badge,
            price: props.price,
            colors: props.color,
          })
        );

      // redirect user
      if (info && info.statusCode !== 201) {
        navigate("/signin");
        alert(`${info.results.message}. You have to sign in`);
      }
    } else {
      navigate("/signin");
      alert(`You have to sign in`);
    }
  };

  return (
    <div className="w-full relative group">
      <div className="max-w-80 max-h-80 relative overflow-y-hidden ">
        <div>
          <Image className="w-full h-full" imgSrc={props.img} />
        </div>
        <div className="absolute top-6 left-8">
          {props.badge && <Badge text="New" />}
        </div>
        <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
          <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
            <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
              Compare
              <span>
                <GiReturnArrow />
              </span>
            </li>
            <li
              onClick={handleAddToCartClick}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              Add to Cart
              <span>
                <FaShoppingCart />
              </span>
            </li>
            <li
              onClick={handleProductDetails}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              View Details
              <span className="text-lg">
                <MdOutlineLabelImportant />
              </span>
            </li>
            <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
              Add to Wish List
              <span>
                <BsSuitHeartFill />
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-primeColor font-bold">
            {props.productName}
          </h2>
          <p className="text-[#767676] text-[14px]">${props.price}</p>
        </div>
        <div>
          <p className="text-[#767676] text-[14px]">{props.color}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
