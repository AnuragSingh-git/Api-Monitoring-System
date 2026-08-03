import mongoose, { Schema, Document, Model } from "mongoose";

export interface IIncident extends Document {
  apiId: mongoose.Types.ObjectId;
  startedAt: Date;
  endedAt?: Date;
  resolved: boolean;
  reason?: string;
}

const IncidentSchema = new Schema<IIncident>(
  {
    apiId: {
      type: Schema.Types.ObjectId,
      ref: "Api",
      required: true,
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    endedAt: Date,

    resolved: {
      type: Boolean,
      default: false,
    },

    reason: String,
  },
  {
    timestamps: true,
  }
);

export default (mongoose.models.Incident as Model<IIncident>) ||
  mongoose.model<IIncident>("Incident", IncidentSchema);