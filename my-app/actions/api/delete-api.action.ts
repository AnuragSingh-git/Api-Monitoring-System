"use server";

import { deleteApi } from "../../services/api.services";

export const deleteApiAction = async (apiId: string) => {
  try {
    await deleteApi(apiId);

    return {
      success: true,
      message: "API deleted successfully",
    };
  } catch (error) {
    console.error("Delete API action error:", error);

    return {
      success: false,
      message: "Failed to delete API",
    };
  }
};