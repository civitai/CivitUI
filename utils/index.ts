import config from "@/app/config";

export * from "./connection";
export * from "./input";
export * from "./node";
export * from "./persistence";
export * from "./queue";
export * from "./widget";

/**
 * Returns the full backend API URL
 * @param endpoint - The API endpoint
 * @returns The full URL
 */
export const getBackendUrl = (endpoint: string): string =>
  `${config.host}${endpoint}`;
