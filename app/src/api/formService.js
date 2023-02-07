const axios = require("axios");

const BASE_URL = "http://localhost:4000";

export const createForm = (formData) => {
  return axios.post(`${BASE_URL}/forms`, formData);
};

export const getForms = () => {
  return axios.get(`${BASE_URL}/forms`);
};

export const getFormById = (id) => {
  return axios.get(`${BASE_URL}/forms/${id}`);
};

export const updateForm = (id, formData) => {
  return axios.put(`${BASE_URL}/forms/${id}`, formData);
};

export const deleteForm = (id) => {
  return axios.delete(`${BASE_URL}/forms/${id}`);
};

export const submitResponse = (responseData) => {
  return axios.post(`${BASE_URL}/responses`, responseData);
};

export const getResponsesByFormId = (formId) => {
  return axios.get(`${BASE_URL}/responses/${formId}`);
};
