import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import connectdb from "./db";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_KEY!);

export const auth = betterAuth({
    database: mongodbAdapter(client.db("Api")),
    emailAndPassword: {
        enabled: true
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24,
    }
});