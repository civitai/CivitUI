const config = {
  host: process.env.NEXT_PUBLIC_COMFYUI_SERVER_URL,
};

export default config;

if (process.env.NODE_ENV === "development") {
  console.table({ host: config.host, isMock: true });
}
