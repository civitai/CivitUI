const config = { host: process.env.COMFYUI_SERVER_URL, protocol: "http:" };

export default config;

if (process.env.NODE_ENV === "development") {
  console.table({ host: config.host, isMock: Boolean(process.env.MOCK) });
}
