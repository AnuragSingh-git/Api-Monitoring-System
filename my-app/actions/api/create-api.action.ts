"use server";

import { auth } from "@/lib/auth";
import { createApi } from "../../services/api.services";
import { CreateApiInput } from "../../validations/api.interface";
import { headers } from "next/dist/server/request/headers";

export async function createApiAction(data: CreateApiInput) {
  try {
    const session = await auth.api.getSession({headers:await headers()});
    const userId = session?.user?.id;
    if (!userId) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }
    const api = await createApi(data, userId);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(api)),
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to create API",
    };
  }
}
