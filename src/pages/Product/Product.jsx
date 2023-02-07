import { Publish } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import "./Product.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { updateProduct } from "../../redux/apiCalls";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

const Product = () => {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [product, setProduct] = useState({
    title: "",
    desc: "",
    img: "",
    categories: [],
    size: [],
    color: [],
    price: 0,
    inStock: true,
  });
  const [img, setImg] = useState(null);
  const dispatch = useDispatch;

  // const product = useSelector((state) =>
  //   state.product.products.find((p) => p._id === productId)
  // );

  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get(
        `https://ecommerce-backend-tf4t.onrender.com/api/products/find/${productId}`
      );
      setProduct(res.data);
    };

    getProduct();
  }, [productId]);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (img === null) {
      updateProduct(productId, product, dispatch);
    } else {
      const fileName = new Date().getTime() + img.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const newproduct = {
              ...product,
              img: downloadURL,
            };
            console.log(newproduct);
            updateProduct(productId, newproduct, dispatch);
          });
        }
      );
    }
  };

  const handleChange = (e) => {
    setProduct((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // setUpdatedProduct(product);

  console.log(img);
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productInfoTitle">
              {product.title.toUpperCase()}
            </span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <div className="productInfoKey">id:</div>
              <div className="productInfoValue">{product._id}</div>
            </div>
            <div className="productInfoItem">
              <div className="productInfoKey">sales:</div>
              <div className="productInfoValue">5123</div>
            </div>
            <div className="productInfoItem">
              <div className="productInfoKey">in stock:</div>
              <div className="productInfoValue">{product.inStock}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              type="text"
              value={product.title}
              name="title"
              onChange={handleChange}
            />
            <label>Product Description</label>
            <input
              type="text"
              value={product.desc}
              name="desc"
              onChange={handleChange}
            />
            <label>Product Price</label>
            <input
              type="Number"
              value={product.price}
              name="price"
              onChange={handleChange}
            />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={img !== null ? URL.createObjectURL(img) : product.img}
                alt=""
                className="productUploadImg"
              />
              <label htmlFor="file">
                <Publish className="productUploadIcon" />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                name="img"
                onChange={(e) => {
                  setImg(e.target.files[0]);
                }}
              />
            </div>
            <button className="productButton" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product;
