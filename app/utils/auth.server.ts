import { json } from "@remix-run/node";

const VALID_USERNAME = process.env.VALID_USERNAME;
const VALID_PASSWORD = process.env.VALID_PASSWORD;

export async function authenticateUser(request: Request) {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader) {
    throw json("Unauthorized", {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  const [scheme, credentials] = authHeader.split(" ");

  if (scheme !== "Basic") {
    throw json("Invalid authentication scheme", {
      status: 400,
      statusText: "Bad Request",
    });
  }

  const [username, password] = Buffer.from(credentials, "base64")
    .toString()
    .split(":");

  if (username !== VALID_USERNAME || password !== VALID_PASSWORD) {
    throw json("Invalid credentials", {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  return true;
}
