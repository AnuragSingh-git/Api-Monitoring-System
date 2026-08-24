"use server"

import { CreateApiInput } from "../../validations/api.interface";
import { getApiById } from "../../services/api.services";

export const getApiAction = async (apiId: string) => {
  try {
    const apiData = await getApiById(apiId);

    return {
        success: true,
        data: apiData,
    };
  } catch (error) {
    console.error("Get API action error:", error);
    return {
        success: false,
        message: "Failed to get API",
    };
  }
};