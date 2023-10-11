import lighthouse from "lighthouse";

import open from "open";
import { writeFile } from "fs/promises";
import puppeteer from "puppeteer";
import { URL, chromeExecutablePath, config, authCookie } from "./lh-config.js";

async function runAudit(url: string) {
  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: null,
    ignoreDefaultArgs: ["--enable-automation"],
    executablePath: chromeExecutablePath,
  });
  const page = await browser.newPage();

  await page.setCookie(authCookie);

  const result = await lighthouse(url, undefined, config, page);
  const date = new Date().toLocaleTimeString();

  await Promise.all([
    writeFile(`./reports/report-${date}.html`, result.report),
    writeFile(`./reports/trace-${date}.json`, JSON.stringify(result.artifacts)),
  ]);

  await open(`./reports/report-${date}.html`);
  await browser.close();
}

export async function runAll() {
  await runAudit(URL);
}
