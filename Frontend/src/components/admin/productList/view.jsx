import { useState } from "react";

const ProductInfoView = ({ productInfo, onClose, onSave, onDelete }) => {
  const [productName, setProductName] = useState(productInfo.productName || "");
  const [price, setPrice] = useState(productInfo.price || "");
  const [description, setDescription] = useState(productInfo.des || "");
  const [color, setColor] = useState(productInfo.color || "");
  const [badge, setBadge] = useState(productInfo.badge || false);
  const [imageUrl, setImageUrl] = useState(productInfo.imageUrl || "");
  const [isEditing, setIsEditing] = useState(
    Object.keys(productInfo).length === 0
  );

  // console.log(Object.keys(productInfo).length === 0);

  const handleSave = () => {
    // Validation: Ensure all fields are filled
    if (!productName || !price || !description || !color || !imageUrl) {
      alert("All fields must be filled before saving.");
      return;
    }

    const updatedProduct = {
      id: productInfo.id,
      des: description,
      productName,
      price,
      color,
      badge,
      imageUrl,
    };

    // console.log(updatedProduct);
    onSave(updatedProduct);
    setIsEditing(false);
  };

  const handleCopyImageUrl = () => {
    navigator.clipboard.writeText(imageUrl);
    alert("Image URL copied to clipboard!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-4/5 max-w-3xl rounded-lg shadow-lg overflow-y-auto relative p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="h-full flex flex-col items-center justify-center">
            <img
              src={imageUrl}
              alt={productName}
              className="w-full h-auto rounded-lg shadow-md"
            />
            {!isEditing && (
              <div className="inline-flex items-center gap-3 mt-2 cursor-pointer text-gray-500 hover:text-gray-800">
                <span
                  className="material-symbols-outlined"
                  onClick={handleCopyImageUrl}
                >
                  content_copy
                </span>
                Copy Image Url
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-4 justify-center">
            <h2 className="text-2xl font-bold">
              {isEditing ? (
                <input
                  placeholder="Product Name e.g. Bag"
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="border rounded-md px-2 py-1 w-full"
                />
              ) : (
                productName
              )}
            </h2>
            <p>
              <span className="font-semibold">Price:</span>{" "}
              {isEditing ? (
                <input
                  placeholder="Price e.g. 1000"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="border rounded-md px-2 py-1 w-full"
                />
              ) : (
                `$${price}`
              )}
            </p>
            <p>
              <span className="font-semibold">Description:</span>{" "}
              {isEditing ? (
                <textarea
                  placeholder="Describe the product in detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border rounded-md px-2 py-1 w-full resize-y max-h-96"
                />
              ) : (
                <span className="line-clamp-3">{description}</span>
              )}
            </p>
            <p>
              <span className="font-semibold">Color:</span>{" "}
              {isEditing ? (
                <input
                  placeholder="Color e.g. Black, White, Mixed"
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="border rounded-md px-2 py-1 w-full"
                />
              ) : (
                color
              )}
            </p>
            <p>
              <span className="font-semibold">Badge:</span>{" "}
              {isEditing ? (
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={badge}
                    onChange={(e) => setBadge(e.target.checked)}
                    className="form-checkbox"
                  />
                  Enable New Badge
                </label>
              ) : (
                <span>{badge ? "Enabled" : "Disabled"}</span>
              )}
            </p>
            <p>
              <span className="font-semibold">Image URL:</span>{" "}
              {isEditing ? (
                <input
                  placeholder="Image URL e.g. https://example.com/img.jpg"
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="border rounded-md px-2 py-1 w-full"
                />
              ) : (
                <span className="line-clamp-3">{imageUrl}</span>
              )}
            </p>
            <div className="flex gap-4 mt-4">
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Edit
                </button>
              )}
              {!isEditing && (
                <button
                  onClick={() => onDelete(productInfo.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              )}
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoView;
