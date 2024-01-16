import axios from "axios";
import BACKEND_URL from "../assets/BACKEND_URL";

export async function fetchAllStocks() {
  try {
    const response = await axios.get(`${BACKEND_URL}stock`);
    return response.data.stocks.reverse();
  } catch (error) {
    console.error("Error fetching stocks:", error);
    throw error;
  }
}

export async function stockCreate(productId, formData) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}stock/${productId}`,
      formData,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function fetchStockDetails(stockId) {
  try {
    const response = await axios.get(`${BACKEND_URL}stock/${stockId}`);
    return response.data.stockDetails;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function stockUpdate(stockId, formData) {
  try {
    const response = await axios.put(
      `${BACKEND_URL}stock/${stockId}`,
      formData,
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.error("Error updating stock:", error);
    throw error;
  }
}
export async function stockDelete(stockId) {
  try {
    const response = await axios.delete(`${BACKEND_URL}stock/${stockId}`);
    return response;
  } catch (error) {
    console.error("Error deleting stock:", error);
    throw error;
  }
}
