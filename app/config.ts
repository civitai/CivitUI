const config = {
  // host: process.env.NEXT_PUBLIC_COMFYUI_SERVER_URL,
  host: "127.0.0.1:8188",
  protocol: "http:",
};

export default config;

if (
  process.env.NODE_ENV === "development" ||
  process.env.VERCEL_ENV === "preview"
) {
  console.table({ host: config.host, isMock: true });
}
