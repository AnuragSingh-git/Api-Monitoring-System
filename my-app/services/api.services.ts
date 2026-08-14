import api from "../models/api.model";

interface CreateApiInput {
  name: string;
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  interval: number;
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
}

export const createApi = async (apiData: CreateApiInput) => {
  try {
    const userId = "64b8e3f5c9e1f2a1b2c3d4e5"; // Replace with actual user ID retrieval logic
    apiData = { ...apiData, userId };
    const ApiData= await api.create(apiData);
    return ApiData.toObject();
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

export const updateApi = async (apiId: string, updateData: Partial<CreateApiInput>) => {
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