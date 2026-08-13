"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createApiAction } from "../../../../actions/api/create-api.action";
import { HttpMethod } from "../../../../validations/api.interface";

export default function ApiForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    url: "",
    method: "GET" as HttpMethod,
    interval: 60,
    headers: "",
    body: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "interval"
          ? Number(value)
          : name === "method"
          ? (value as HttpMethod)
          : value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const result = await createApiAction({
        name: formData.name,
        url: formData.url,
        method: formData.method,
        interval: formData.interval,
      });

      if (!result.success) {
        alert(result.error);
        return;
      }

      alert("API added successfully!");

      router.push("/dashboard/apis");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl space-y-6 rounded-xl border bg-white p-6 shadow-sm"
    >
      {/* API Name */}
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium"
        >
          API Name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          placeholder="Payment API"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2"
        />
      </div>

      {/* URL */}
      <div>
        <label
          htmlFor="url"
          className="mb-2 block text-sm font-medium"
        >
          API URL
        </label>

        <input
          id="url"
          name="url"
          type="url"
          placeholder="https://api.example.com/users"
          value={formData.url}
          onChange={handleChange}
          required
          className="w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2"
        />
      </div>

      {/* Method */}
      <div>
        <label
          htmlFor="method"
          className="mb-2 block text-sm font-medium"
        >
          HTTP Method
        </label>

        <select
          id="method"
          name="method"
          value={formData.method}
          onChange={handleChange}
          className="w-full rounded-lg border px-4 py-2.5"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="PATCH">PATCH</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>

      {/* Interval */}
      <div>
        <label
          htmlFor="interval"
          className="mb-2 block text-sm font-medium"
        >
          Check Interval
        </label>

        <select
          id="interval"
          name="interval"
          value={formData.interval}
          onChange={handleChange}
          className="w-full rounded-lg border px-4 py-2.5"
        >
          <option value={30}>Every 30 seconds</option>
          <option value={60}>Every 1 minute</option>
          <option value={300}>Every 5 minutes</option>
          <option value={600}>Every 10 minutes</option>
        </select>
      </div>

      {/* Headers */}
      <div>
        <label
          htmlFor="headers"
          className="mb-2 block text-sm font-medium"
        >
          Headers
        </label>

        <textarea
          id="headers"
          name="headers"
          placeholder={`{
  "Authorization": "Bearer token"
}`}
          value={formData.headers}
          onChange={handleChange}
          rows={5}
          className="w-full rounded-lg border px-4 py-2.5 font-mono text-sm"
        />

        <p className="mt-1 text-xs text-gray-500">
          Optional JSON headers
        </p>
      </div>

      {/* Body */}
      {(formData.method === "POST" ||
        formData.method === "PUT" ||
        formData.method === "PATCH") && (
        <div>
          <label
            htmlFor="body"
            className="mb-2 block text-sm font-medium"
          >
            Request Body
          </label>

          <textarea
            id="body"
            name="body"
            placeholder={`{
  "email": "test@example.com"
}`}
            value={formData.body}
            onChange={handleChange}
            rows={6}
            className="w-full rounded-lg border px-4 py-2.5 font-mono text-sm"
          />
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border px-5 py-2.5"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-black px-5 py-2.5 text-white disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Monitor"}
        </button>
      </div>
    </form>
  );
}