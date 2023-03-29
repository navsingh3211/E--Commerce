import React from "react";
import { useNavigate } from "react-router-dom"; //it is hook used to redirect

const AddProduct = () => {
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [company, setCompany] = React.useState("");
    const [error, setError] = React.useState(false);
  
    const navigate = useNavigate();
        
  const add_product = async () => {
        // console.warn(name);
        // return false;
      if (!name || !price || !category || !company) {
          setError(true);
            return false;
        }
        let userId = JSON.parse(localStorage.getItem("user"))._id;
        // console.warn(userId);
        let result = await fetch("http://localhost:5000/add-product", {
            method: "POST",
            body: JSON.stringify({ name, price, category, userId, company }),
            headers: {
            "Content-Type": "application/json",
            },
        });
        result = await result.json();
        // console.warn(result);
        if (result) {
            navigate("/");
        }
    }

    return (
      <div className="register">
        <h1>Add Product</h1>
        <input
          className="inputBox"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Enter Name"
        />
        {error && !name && (
          <span className="invalid-input">Enter valid name</span>
        )}
        <input
          className="inputBox"
          type="text"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          placeholder="Enter Price"
        />
        {error && !price && (
          <span className="invalid-input">Enter valid price</span>
        )}
        <input
          className="inputBox"
          type="text"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          placeholder="Enter category"
        />
        {error && !category && (
          <span className="invalid-input">Enter valid category</span>
        )}
        <input
          className="inputBox"
          type="text"
          value={company}
          onChange={(e) => {
            setCompany(e.target.value);
          }}
          placeholder="Enter company"
        />

        {error && !company && (
          <span className="invalid-input">Enter valid company</span>
        )}

        <button onClick={add_product} className="Appbutton" type="button">
          Add Product
        </button>
      </div>
    );
}

export default AddProduct;