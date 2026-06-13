import { config } from "dotenv";
import path from "path";

// Always load packages/backend-common/.env, no matter which app imports this
// package or what the current working directory is. With rootDir "./src" the
// built file lands in dist/, so the .env is one level up in both src and dist.
config({ path: path.join(__dirname, "../.env") });

if (!process.env.JWT_TOKEN) {
    throw new Error("JWT_TOKEN is not set. Check packages/backend-common/.env");
}

export const JWT_TOKEN = process.env.JWT_TOKEN;