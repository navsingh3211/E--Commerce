import React from "react";
import { useNavigate } from "react-router-dom"; //it is hook used to redirect

const AddProduct = () => {
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [company, setCompany] = React.useState("");
    
  
    const navigate = useNavigate();
        
    const add_product = async () => {
        let userId = JSON.parse(localStorage.getItem("user"))._id;
        // console.warn(userId);
        let result = await fetch("/add-product", {
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
        <input
          className="inputBox"
          type="text"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          placeholder="Enter Price"
        />
        <input
          className="inputBox"
          type="text"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          placeholder="Enter category"
        />
        <input
          className="inputBox"
          type="text"
          value={company}
          onChange={(e) => {
            setCompany(e.target.value);
          }}
          placeholder="Enter company"
        />
        
        <button onClick={add_product} className="Appbutton" type="button">
          Add Product
        </button>
      </div>
    );
}

export default AddProduct;