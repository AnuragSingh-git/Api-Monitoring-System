import mongoose, { Schema, Document, Model } from "mongoose";

export interface IApi extends Document {
  name: string;
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: Record<string, any>;
  interval: number;
  isActive: boolean;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ApiSchema = new Schema<IApi>(
  {
    name: {
      type: String,
      required: true,
    },

    url: {
      type: String,
      required: true,
    },

    method: {
      type: String,
      enum: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      default: "GET",
    },

    headers: {
      type: Map,
      of: String,
      default: {},
    },

    body: {
      type: Schema.Types.Mixed,
      default: {},
    },

    interval: {
      type: Number,
      default: 60,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default (mongoose.models.Api as Model<IApi>) ||
  mongoose.model<IApi>("Api", ApiSchema);