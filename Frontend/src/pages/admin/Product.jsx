import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductList from "../../components/admin/ProductList";
import AdminApi from "../../utils/adminApi";
import { setAllProducts } from "../../redux/orebiSlice";
import ProductInfoView from "../../components/admin/productList/view";

const ProductPage = () => {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [sync, setSync] = useState(false);
  const [id, setId] = useState(null);
  const [showAddProductView, setShowAddProductView] = useState(false);

  const all_products = useSelector((state) => state.orebiReducer.allProducts);

  const deleteProduct = async (productId) => {
    try {
      const { data } = await AdminApi.deleteRequest(
        `/apiproducts/${productId}`
      );
      console.log("deleted", data);
      // console.log(JSON.parse(data));

      setShowAddProductView(false);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const fetchProducts = useCallback(async () => {
    try {
      const { data } = await AdminApi.getRequest("/apiproducts");
      const parsedProducts = JSON.parse(data);
      setProducts(parsedProducts);
      dispatch(setAllProducts(parsedProducts));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (sync || all_products.length === 0) {
      fetchProducts();
      setSync(false);
    } else {
      setProducts(all_products);
    }
  }, [sync, all_products, fetchProducts]);

  return (
    <div className="container mx-auto px-4 pt-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-4">Products</h1>
        <button
          onClick={() => setShowAddProductView(true)}
          className="bg-primeColor hover:bg-black text-white font-bold py-2 px-4 rounded duration-300"
        >
          Add Product
        </button>
      </div>

      {/* Product List */}
      <ProductList products={products} />

      <button
        onClick={() => setSync(true)}
        className="mt-4 px-4 py-2 mb-10 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
      >
        Sync Changes
      </button>

      {showAddProductView && (
        <ProductInfoView
          productInfo={{}}
          onSave={async (newProduct) => {
            try {
              const { data } = await AdminApi.postRequest(
                "/apiproducts",
                newProduct
              );
              const parsedProduct = JSON.parse(data);
              console.log(parsedProduct);

              fetchProducts();
              setId(parsedProduct.id);
              // setShowAddProductView(false);
            } catch (error) {
              console.error("Error adding product:", error);
            }
          }}
          onClose={() => setShowAddProductView(false)}
          onDelete={() => deleteProduct(id)}
        />
      )}
    </div>
  );
};

export default ProductPage;
