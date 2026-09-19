"use client";

import { useState } from "react";
import { checkAllApisAction } from "../../actions/api/checkAllApi.action";

interface ApiResult {
  apiId: string;
  name: string;
  url: string;
  status: "UP" | "DOWN";
  statusCode: number | null;
  responseTime: number;
  error: string | null;
}

export default function CheckAllApisButton() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ApiResult[]>([]);
  const [message, setMessage] = useState("");

  const handleCheckAll = async () => {
    setLoading(true);
    setMessage("");

    const response = await checkAllApisAction();

    if (!response.success) {
      setMessage(response.message ?? "Failed to check APIs.");
      setLoading(false);
      return;
    }

    const apiResults = Array.isArray(response.data)
      ? (response.data as ApiResult[])
      : [];

    setResults(apiResults);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Button */}

      <button
        onClick={handleCheckAll}
        disabled={loading}
        className="rounded-lg bg-black px-5 py-3 text-white disabled:opacity-50"
      >
        {loading ? "Checking APIs..." : "Check All APIs"}
      </button>

      {/* Error */}

      {message && (
        <p className="text-sm text-red-500">
          {message}
        </p>
      )}

      {/* Results */}

      {results.length > 0 && (
        <div className="overflow-hidden rounded-xl border bg-white">
          <table className="w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  API
                </th>

                <th className="px-4 py-3 text-left">
                  Status
                </th>

                <th className="px-4 py-3 text-left">
                  Status Code
                </th>

                <th className="px-4 py-3 text-left">
                  Response Time
                </th>

                <th className="px-4 py-3 text-left">
                  Error
                </th>
              </tr>
            </thead>

            <tbody>
              {results.map((api) => (
                <tr
                  key={api.apiId}
                  className="border-b last:border-0"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium">
                      {api.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      {api.url}
                    </p>
                  </td>

                  <td className="px-4 py-3">
                    {api.status === "UP" ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                        UP
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                        DOWN
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {api.statusCode ?? "-"}
                  </td>

                  <td className="px-4 py-3">
                    {api.responseTime} ms
                  </td>

                  <td className="px-4 py-3 text-sm text-red-500">
                    {api.error ?? "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}