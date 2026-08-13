export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE";

export interface CreateApiInput {
  name: string;
  url: string;
  method: HttpMethod;
  interval: number;
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
}