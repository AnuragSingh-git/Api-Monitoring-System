import api from "../models/api.model";
import connectdb from "@/lib/db";
import {auth} from "../lib/auth";
import { headers } from "next/headers";

connectdb();

interface CreateApiInput {
  userId: string;
  name: string;
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  interval: number;
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
}

export const createApi = async (apiData: Partial<CreateApiInput>) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      throw new Error("User not authenticated");
    }
    const userId = session.user.id;
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
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      throw new Error("User not authenticated");
    }
    const apis = await api.find({ userId: session.user.id }).lean();
    return apis;
  } catch (error) {
    console.error("Error fetching API:", error);
    throw error;
  }
};

export const getApiById = async (apiId: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      throw new Error("User not authenticated");
    }
    const apiData = await api.findById(apiId);
    if (!apiData) {
      throw new Error("API not found");
    }
    return apiData;
  } catch (error) {
    console.error("Error fetching API by ID", error);
    throw error;
  }
};

export const updateApi = async (apiId: string, updateData: Partial<CreateApiInput>) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      throw new Error("User not authenticated");
    }
    const updatedApi = await api.findByIdAndUpdate(apiId, updateData, { new: true });
    return updatedApi;
  } catch (error) {
    console.error("Error updating API", error);
    throw error;
  }
};

export const deleteApi = async (apiId: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      throw new Error("User not authenticated");
    }
    await api.findByIdAndDelete(apiId);
  } catch (error) {
    console.error("Error deleting API:", error);
    throw error;
  }
};