import admin from "firebase-admin";
import { fireConfig } from "./fireconfig";
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(fireConfig),
    });
  } catch (error) {
    console.log("Firebase admin initialization error", error.stack);
  }
}
export default admin;
