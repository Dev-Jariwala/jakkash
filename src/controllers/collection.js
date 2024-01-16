import axios from "axios";
import BACKEND_URL from "../assets/BACKEND_URL";

export async function setActiveCollection(collectionId) {
  try {
    await axios.put(
      `${BACKEND_URL}collection/${collectionId}`,
      {},
      { withCredentials: true }
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function fetchAllCollections(collectionId) {
  try {
    const response = await axios.get(`${BACKEND_URL}collection`);
    return response.data.senitizedCollections;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getCollectionDetails(collectionId) {
  try {
    const response = await axios.get(
      `${BACKEND_URL}collection/${collectionId}`
    );
    return response.data.collectionDetails;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function collectionDelete(collectionId) {
  try {
    await axios.delete(`${BACKEND_URL}collection/${collectionId}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function collectionCreate(formData) {
  try {
    const response = await axios.post(`${BACKEND_URL}collection`, formData, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function collectionUpdate(collectionId, formData) {
  try {
    await axios.put(
      `${BACKEND_URL}collection/update/${collectionId}`,
      formData,
      { withCredentials: true }
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
}
