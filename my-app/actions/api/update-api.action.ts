"use server"

import { CreateApiInput } from "../../validations/api.interface"
import { updateApi } from "../../services/api.services"

export const updateApiAction = async (apiId: string, apiData: Partial<CreateApiInput>) => {
    try {
        const response = await updateApi(apiId, apiData);
        return {
            success: true,
            data: response,
        };
    } catch (error) {
        console.error("Update API action error:", error);
        return {
            success: false,
            message: "Failed to update API",
        };
    }
}