import { test } from "vitest";
import { getWasmInstance } from "./base.js";
import { getWasmInstance as getWasmInstanceNew } from "./new.js";

const asmLibraryArg = {
  emscripten_get_now: () => Date.now(),
  emscripten_memcpy_big: () => {},
  emscripten_resize_heap: () => false,
  fd_write: () => 0,
};

getWasmInstance({
  env: asmLibraryArg,
  wasi_snapshot_preview1: asmLibraryArg,
});

test("getWasmInstance", async ({ bench }) => {
  await bench.compare(
    bench("original", { perProject: true }, async () => {
      getWasmInstance({
        env: asmLibraryArg,
        wasi_snapshot_preview1: asmLibraryArg,
      });
    }),
    bench("compressed (gzip)", { perProject: true }, async () => {
      getWasmInstanceNew({
        env: asmLibraryArg,
        wasi_snapshot_preview1: asmLibraryArg,
      });
    }),
    {
      subtractTimerOverhead: true,
      time: 250,
      iterations: 16,
      // Bench fast
      // warmup: false,
      // time: 0,
      // iterations: 1,
    },
  );
});
