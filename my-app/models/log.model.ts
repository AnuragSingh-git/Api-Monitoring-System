import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMonitorLog extends Document {
  apiId: mongoose.Types.ObjectId;
  status: "UP" | "DOWN";
  statusCode?: number;
  responseTime?: number;
  error?: string;
  checkedAt: Date;
}

const MonitorLogSchema = new Schema<IMonitorLog>({
  apiId: {
    type: Schema.Types.ObjectId,
    ref: "Api",
    required: true,
  },

  status: {
    type: String,
    enum: ["UP", "DOWN"],
    required: true,
  },

  statusCode: Number,

  responseTime: Number,

  error: String,

  checkedAt: {
    type: Date,
    default: Date.now,
  },
});

export default (mongoose.models.MonitorLog as Model<IMonitorLog>) ||
  mongoose.model<IMonitorLog>("MonitorLog", MonitorLogSchema);