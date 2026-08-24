"use server";

import { updateApi } from "../../services/api.services";
import {getAllApis} from "../../services/api.services";

export const getAllApiAction = async () => {
  try {
    const apis = await getAllApis();
    return {
      success: true,
      data: apis,
    };
  } catch (error) {
    console.error("Get All APIs action error:", error);
    return {
      success: false,
      message: "Failed to get APIs",
    };
  }
};