import { getDashboardAction } from "@/actions/dashboard/get-dashboard.action";

export default async function DashboardPage() {
  const result = await getDashboardAction();

  if (!result.success) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold">
          Failed to load dashboard
        </h1>

        <p className="text-red-500">
          {result.message}
        </p>
      </div>
    );
  }

  const data = result.data;

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            API Monitoring Dashboard
          </h1>

          <p className="mt-1 text-gray-500">
            Monitor your APIs and track their performance.
          </p>
        </div>


        {/* Statistics */}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">

          <StatCard
            title="Total APIs"
            value={data.totalApis}
          />

          <StatCard
            title="APIs UP"
            value={data.upApis}
          />

          <StatCard
            title="APIs DOWN"
            value={data.downApis}
          />

          <StatCard
            title="Avg Response"
            value={`${data.averageResponseTime} ms`}
          />

          <StatCard
            title="Uptime"
            value={`${data.uptime}%`}
          />

        </div>


        {/* Recent Checks */}

        <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">

          <h2 className="mb-4 text-xl font-semibold">
            Recent API Checks
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="border-b text-left">
                  <th className="p-3">
                    API
                  </th>

                  <th className="p-3">
                    Status
                  </th>

                  <th className="p-3">
                    Response
                  </th>

                  <th className="p-3">
                    Status Code
                  </th>

                  <th className="p-3">
                    Checked At
                  </th>
                </tr>
              </thead>

              <tbody>

                {data.recentLogs.map((log: any) => (

                  <tr
                    key={log._id}
                    className="border-b"
                  >

                    <td className="p-3">
                      {log.apiId?.name || "Unknown API"}
                    </td>

                    <td className="p-3">

                      {log.status === "UP" ? (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                          UP
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                          DOWN
                        </span>
                      )}

                    </td>

                    <td className="p-3">
                      {log.responseTime
                        ? `${log.responseTime} ms`
                        : "-"}
                    </td>

                    <td className="p-3">
                      {log.statusCode || "-"}
                    </td>

                    <td className="p-3 text-gray-500">
                      {new Date(
                        log.checkedAt
                      ).toLocaleString()}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </main>
  );
}


function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h2 className="mt-2 text-2xl font-bold">
        {value}
      </h2>

    </div>
  );
}