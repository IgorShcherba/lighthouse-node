import { Config } from "lighthouse";
import dotenv from "dotenv";

const env = dotenv.config().parsed;
export const config: Config = {
  extends: "lighthouse:default",
  settings: {
    onlyCategories: ["performance"],
    output: ["html"],
    throttlingMethod: "simulate",
    channel: "lr",
    throttling: {
      rttMs: 150,
      throughputKbps: 1638.4,
      cpuSlowdownMultiplier: parseInt(env.CPU_SLOWDOWN_MULTIPLIER || "4", 10),
      requestLatencyMs: 562.5,
      downloadThroughputKbps: 1474.56,
      uploadThroughputKbps: 675,
    },
  },
};

export const URL = env.URL || "";

export const authCookie = {
  name: env.COOKIE_NAME || "",
  value: env.COOKIE_VALUE || "",
  domain: env.COOKIE_DOMAIN || "",
  path: "/",
};

export const chromeExecutablePath =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
