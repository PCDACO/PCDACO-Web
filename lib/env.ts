import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z
    .string()
    .default("https://pcdaco-api.persiehomeserver.com"),
  NEXT_PUBLIC_API_KEY: z
    .string()
    .min(1, { message: "API key is required" })
    .default("f5d8e5a7c3b9a2d7e4f1c6b8a9d3e7f2c5a1b4d9f8e6a7c2d3f4b1a9c8e2f7"),
});

// Validate the environment variables
const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error("Invalid environment variables:", env.error.format());
  throw new Error("Invalid environment variables");
}

export const { NEXT_PUBLIC_API_URL, NEXT_PUBLIC_API_KEY } = env.data;
