export interface CreateApiInput {
  name: string;
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  interval: number;
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
}