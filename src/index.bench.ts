import { test } from "vitest";

const asmLibraryArg = {
  emscripten_get_now: () => Date.now(),
  emscripten_memcpy_big: () => {},
  emscripten_resize_heap: () => false,
  fd_write: () => 0,
};

test("getWasmInstance", async ({ bench }) => {
  await bench.compare(
    bench("original", { perProject: true }, async () => {
      await import("./base.ts").then(({ getWasmInstance }) =>
        getWasmInstance({
          env: asmLibraryArg,
          wasi_snapshot_preview1: asmLibraryArg,
        }),
      );
    }),
    bench("compressed (gzip)", { perProject: true }, async () => {
      await import("./new.ts").then(({ getWasmInstance }) =>
        getWasmInstance({
          env: asmLibraryArg,
          wasi_snapshot_preview1: asmLibraryArg,
        }),
      );
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
