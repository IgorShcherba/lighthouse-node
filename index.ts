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
  const now = new Date();
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(now.getDate()).padStart(2, "0")}-${String(
    now.getHours()
  ).padStart(2, "0")}-${String(now.getMinutes()).padStart(2, "0")}-${String(
    now.getSeconds()
  ).padStart(2, "0")}`;

  await Promise.all([
    writeFile(`./reports/report-qa${dateStr}.html`, result.report),
    writeFile(
      `./reports/trace-qa${dateStr}.json`,
      JSON.stringify(result.artifacts)
    ),
  ]);

  await open(`./reports/report-qa${dateStr}.html`);
  await browser.close();
}

export async function runAll() {
  await runAudit(URL);
}
