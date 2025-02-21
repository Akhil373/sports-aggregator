import dotenv from "dotenv";
import admin from "firebase-admin";
import * as fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: "../../.env" });

// Adjust the path to go one directory up from the current module's directory
const serviceAccountPath = join(
  __dirname,
  "..",
  "..",
  "football-test-81e33-51a976a07996.json",
);
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

// Get a reference to the database service
const database = admin.database();

export { admin, database };
