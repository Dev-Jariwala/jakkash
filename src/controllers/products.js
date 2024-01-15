import axios from "axios";
import BACKEND_URL from "../assets/BACKEND_URL";
export async function fetchAllProducts() {
  try {
    const response = await axios.get(`${BACKEND_URL}product`);
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function productCreate(formData) {
  try {
    const response = await axios.post(`${BACKEND_URL}product`, formData, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function productUpdate(productId, formData) {
  try {
    const response = await axios.put(
      `${BACKEND_URL}product/${productId}`,
      formData,
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

export async function productDelete(productId) {
  try {
    const response = await axios.delete(`${BACKEND_URL}product/${productId}`);
    return response;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

export async function fetchProductDetails(productId) {
  try {
    const response = await axios.get(`${BACKEND_URL}product/${productId}`);
    return response.data.productDetails;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
