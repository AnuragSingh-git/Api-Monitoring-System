import api from "../models/api.model";

export const createApi = async (apiData: any) => {
  try {
    const ApiData= await api.create(apiData);
    return ApiData;
  } catch (error) {
    console.error("Error creating API:", error);
    throw error;
  }
};

export const getAllApis = async () => {
  try {
    const apis = await api.find();
    return apis;
  } catch (error) {
    console.error("Error fetching APIs:", error);
    throw error;
  }
};

export const getApiById = async (apiId: string) => {
  try {
    const apiData = await api.findById(apiId);
    return apiData;
  } catch (error) {
    console.error("Error fetching API by ID:", error);
    throw error;
  }
};

export const updateApi = async (apiId: string, updateData: any) => {
  try {
    const updatedApi = await api.findByIdAndUpdate(apiId, updateData, { new: true });
    return updatedApi;
  } catch (error) {
    console.error("Error updating API:", error);
    throw error;
  }
};

export const deleteApi = async (apiId: string) => {
  try {
    await api.findByIdAndDelete(apiId);
  } catch (error) {
    console.error("Error deleting API:", error);
    throw error;
  }
};