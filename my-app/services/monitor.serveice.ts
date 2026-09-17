import axios from "axios";
import Api from "@/models/api.model";
import MonitorLog from "../models/log.model";

export const checkApi = async (apiId: string) => {
  const api = await Api.findById(apiId);

  if (!api) {
    throw new Error("API not found");
  }

  const startTime = Date.now();

  try {
    const response = await axios({
      method: api.method,
      url: api.url,
      headers: api.headers || {},
      data: api.body || undefined,
      timeout: 10000,

      // We want to handle 4xx/5xx ourselves
      validateStatus: () => true,
    });

    const responseTime = Date.now() - startTime;

    const isUp =
      response.status >= 200 && response.status < 400;

    const log = await MonitorLog.create({
      apiId: api._id,
      status: isUp ? "UP" : "DOWN",
      statusCode: response.status,
      responseTime,
      error: isUp ? undefined : `HTTP ${response.status}`,
      checkedAt: new Date(),
    });

    return {
      apiId: api._id.toString(),
      name: api.name,
      url: api.url,
      status: isUp ? "UP" : "DOWN",
      statusCode: response.status,
      responseTime,
      error: isUp ? null : `HTTP ${response.status}`,
    };
  } catch (error: any) {
    const responseTime = Date.now() - startTime;

    const errorMessage = axios.isAxiosError(error)
      ? error.message
      : "Unknown error";

    await MonitorLog.create({
      apiId: api._id,
      status: "DOWN",
      statusCode: error.response?.status || null,
      responseTime,
      error: errorMessage,
      checkedAt: new Date(),
    });

    return {
      apiId: api._id.toString(),
      name: api.name,
      url: api.url,
      status: "DOWN",
      statusCode: error.response?.status || null,
      responseTime,
      error: errorMessage,
    };
  }
};