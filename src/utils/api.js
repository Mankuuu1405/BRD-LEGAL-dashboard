import axios from "axios";
import { MockAPI } from "./mock";

const BASE_URL = import.meta.env.VITE_API_URL || "";

export const api = {
  // ===============================
  // Legal Dashboard
  // ===============================
  async getLegalDashboard() {
    try {
      const res = await axios.get(`${BASE_URL}/legal/dashboard`);
      return res.data; // real API data
    } catch (err) {
      console.warn("API failed. Using mock data → getLegalDashboard()");
      return MockAPI.getLegalDashboard(); // fallback mock data
    }
  },

  // ===============================
  // Agreement Approvals
  // ===============================
  async getAgreements() {  // ✅ must match what your page calls
  try {
    const res = await axios.get(`${BASE_URL}/legal/agreements`);
    return res.data;
  } catch {
    console.warn("Backend failed → Using mock Agreement Approvals");
    return MockAPI.getAgreements(); // fallback
  }
},


// ===============================
// Document Validation
// ===============================
async getDocuments() {
  try {
    const res = await axios.get(`${BASE_URL}/legal/documents`);
    return res.data; // API response
  } catch (err) {
    console.warn("Backend failed → Using mock documents");
    return MockAPI.getDocuments(); // fallback mock
  }
},


};
