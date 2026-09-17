import Api from "../models/api.model";
import MonitorLog from "../models/log.model";

export const getDashboardData = async () => {
  // Total APIs
  const totalApis = await Api.countDocuments();

  // Get all APIs
  const apis = await Api.find()
    .sort({ createdAt: -1 })
    .lean();

  // Get latest log for every API
  const latestLogs = await Promise.all(
    apis.map(async (api) => {
      const log = await MonitorLog.findOne({
        apiId: api._id,
      })
        .sort({ checkedAt: -1 })
        .lean();

      return {
        api,
        log,
      };
    })
  );

  // APIs currently UP
  const upApis = latestLogs.filter(
    (item) => item.log?.status === "UP"
  ).length;

  // APIs currently DOWN
  const downApis = latestLogs.filter(
    (item) => item.log?.status === "DOWN"
  ).length;

  // Response times
  const responseTimes = latestLogs
    .map((item) => item.log?.responseTime)
    .filter(
      (time): time is number => typeof time === "number"
    );

  const averageResponseTime =
    responseTimes.length > 0
      ? Math.round(
          responseTimes.reduce(
            (sum, time) => sum + time,
            0
          ) / responseTimes.length
        )
      : 0;

  // Overall uptime
  const totalChecks = await MonitorLog.countDocuments();

  const successfulChecks =
    await MonitorLog.countDocuments({
      status: "UP",
    });

  const uptime =
    totalChecks > 0
      ? Number(
          ((successfulChecks / totalChecks) * 100).toFixed(2)
        )
      : 100;

  // Recent logs
  const recentLogs = await MonitorLog.find()
    .populate("apiId", "name url")
    .sort({ checkedAt: -1 })
    .limit(10)
    .lean();

  const chartLogs = await MonitorLog.find({
    status: "UP",
    responseTime: { $exists: true },
    })
    .sort({ checkedAt: -1 })
    .limit(20)
    .lean();

  const chartData = chartLogs
    .reverse()
    .map((log) => ({
    time: new Date(log.checkedAt).toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    ),

    responseTime: log.responseTime ?? 0,
  }));

  return {
    totalApis,
    upApis,
    downApis,
    chartData,
    averageResponseTime,
    uptime,
    recentLogs: JSON.parse(
      JSON.stringify(recentLogs)
    ),
  };
};