import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";

const vitestConfig = defineConfig({
  test: {
    projects: [
      // {
      // test: {
      //   name: "browser",
      //   browser: {
      //     provider: playwright(),
      //     enabled: true,
      //     headless: true,
      //     instances: [
      //       // { browser: "chromium" },
      //       // { browser: "firefox" },
      //       // { browser: "webkit" },
      //     ],
      //   },
      // },
      // },
      {
        test: {
          name: "node",
          environment: "node",
        },
      },
    ],
  },
});

export default vitestConfig;
