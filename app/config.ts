const config = {
  host: process.env.NEXT_PUBLIC_COMFYUI_SERVER_URL,
  protocol: "http:",
};

export default config;

if (process.env.NODE_ENV === "development") {
  console.table({ host: config.host, isMock: true });
}
