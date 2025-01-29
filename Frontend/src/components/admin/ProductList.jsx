import { useState, useEffect } from "react";
import ProductInfoView from "./productList/view";
import AdminApi from "../../utils/adminApi";

const ProductList = ({ products }) => {
  localStorage.setItem("prdtNum", products.length);
  const [editedProducts, setEditedProducts] = useState([]);
  const [isViewing, setIsViewing] = useState(null);

  useEffect(() => {
    setEditedProducts(products);
  }, [products]);

  const deleteProduct = async (productId) => {
    try {
      const { data } = await AdminApi.deleteRequest(
        `/apiproducts/${productId}`
      );
      setEditedProducts((prev) =>
        prev.filter((product) => product.id !== productId)
      );
      console.log("deleted", data);
      // console.log(JSON.parse(data));

      setIsViewing(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const saveEditedProduct = async (updatedProduct) => {
    try {
      const { data } = await AdminApi.putRequest(
        `/apiproducts/${updatedProduct.id}`,
        updatedProduct
      );
      setEditedProducts((prev) =>
        prev.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
      console.log(JSON.parse(data));
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <div className="mt-4 relative">
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="text-center">S/N</th>
            <th className="text-left pl-10">Name</th>
            <th className="text-center">Price</th>
            <th className="text-center">Color</th>
            <th className="text-center">Category</th>
            <th className="text-center">Orders</th>
            <th className="text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {editedProducts.map((product, index) => (
            <tr
              onClick={() => setIsViewing({ state: true, product })}
              className="h-12 border-b-[1px] border-b-gray-300 hover:bg-gray-200 cursor-pointer"
              key={product.id}
            >
              <td className="text-center">{index + 1}</td>
              <td className="text-left pl-10">{product.productName}</td>
              <td className="text-center">${product.price}</td>
              <td className="text-center">{product.color}</td>
              <td className="text-center">Accessories</td>
              <td className="text-center">3</td>
              <td className="text-center">
                <span className="material-symbols-outlined">check_circle</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isViewing?.state && (
        <ProductInfoView
          productInfo={isViewing.product}
          onSave={saveEditedProduct}
          onDelete={deleteProduct}
          onClose={() => setIsViewing(null)}
        />
      )}
    </div>
  );
};

export default ProductList;
