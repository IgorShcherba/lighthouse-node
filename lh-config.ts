import { Config } from "lighthouse";
import dotenv from "dotenv";

const env = dotenv.config().parsed;
export const config: Config = {
  extends: "lighthouse:default",
  settings: {
    onlyCategories: ["performance"],
    output: ["html"],
    throttlingMethod: "simulate",
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
