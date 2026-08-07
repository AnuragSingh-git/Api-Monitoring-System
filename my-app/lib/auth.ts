import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import connectdb from "./db";

export const auth = betterAuth({
    database: mongodbAdapter(connectdb),   
});