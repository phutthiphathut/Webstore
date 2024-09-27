// AddProductForm.js
"use client";
import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = ({ closeForm }) => { // Accept closeForm function as a prop
  const [productType, setProductType] = useState('mouse');
  const [productData, setProductData] = useState({
    name: '',
    brand: '',
    wireless: '',
    type: '',
    size: '',
    refreshRate: '',
    surroundSound: '',
    price: '',
    image: '',
  });

  // Handle change of product type selection
  const handleTypeChange = (e) => {
    setProductType(e.target.value);
    // Reset form data when the product type changes
    setProductData({
      name: '',
      brand: '',
      wireless: '',
      type: '',
      size: '',
      refreshRate: '',
      surroundSound: '',
      price: '',
      image: '',
    });
  };

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Set the API endpoint dynamically based on product type
      const apiEndpoint = `/api/${productType}s`;
      const response = await axios.post(apiEndpoint, productData);

      // Check if the response status is 201 (created successfully)
      if (response.status === 201) {
        alert(`${productType} product added successfully!`);
        setProductData({
          name: '',
          brand: '',
          wireless: '',
          type: '',
          size: '',
          refreshRate: '',
          surroundSound: '',
          price: '',
          image: '',
        });
        closeForm(); // Close the form after successful submission
      } else {
        console.error('Unexpected response:', response);
        alert(`Failed to add ${productType} product. Please try again.`);
      }
    } catch (error) {
      console.error(`Error adding ${productType} product:`, error.response?.data || error.message);
      alert(`Failed to add ${productType} product. Please try again.`);
    }
  };

  // Handle form cancellation
  const handleCancel = () => {
    // Reset the form data to initial values
    setProductData({
      name: '',
      brand: '',
      wireless: '',
      type: '',
      size: '',
      refreshRate: '',
      surroundSound: '',
      price: '',
      image: '',
    });
    closeForm(); // Call the closeForm function to close the form/modal
  };

  return (
    <form onSubmit={handleSubmit} className="add-product-form">
      <h2>Add New Product</h2>
      <select value={productType} onChange={handleTypeChange}>
        <option value="mouse">Mouse</option>
        <option value="keyboard">Keyboard</option>
        <option value="monitor">Monitor</option>
        <option value="headset">Headset</option>
      </select>

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={productData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="brand"
        placeholder="Brand"
        value={productData.brand}
        onChange={handleChange}
        required
      />

      {/* Conditionally render fields based on the selected product type */}
      {productType === 'mouse' && (
        <select name="wireless" value={productData.wireless} onChange={handleChange} required>
          <option value="">Select Wireless Option</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      )}

      {productType === 'keyboard' && (
        <>
          <input
            type="text"
            name="size"
            placeholder="Keyboard Size (e.g., TKL, Full)"
            value={productData.size}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="type"
            placeholder="Keyboard Type (e.g., Mechanical)"
            value={productData.type}
            onChange={handleChange}
            required
          />
        </>
      )}

      {productType === 'monitor' && (
        <>
          <input
            type="text"
            name="size"
            placeholder='Monitor Size (e.g., 27")'
            value={productData.size}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="refreshRate"
            placeholder="Refresh Rate (e.g., 144Hz)"
            value={productData.refreshRate}
            onChange={handleChange}
            required
          />
        </>
      )}

      {productType === 'headset' && (
        <>
          <select name="wireless" value={productData.wireless} onChange={handleChange} required>
            <option value="">Select Wireless Option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <input
            type="text"
            name="surroundSound"
            placeholder="Surround Sound (e.g., 7.1, Stereo)"
            value={productData.surroundSound}
            onChange={handleChange}
            required
          />
        </>
      )}

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={productData.price}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={productData.image}
        onChange={handleChange}
      />

      {/* Add buttons for submission and cancellation */}
      <div className="form-buttons">
        <button type="submit">Add Product</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default AddProductForm;
