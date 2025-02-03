import { initEdgeStore } from "@edgestore/server";
import { initEdgeStoreClient } from "@edgestore/server/core";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";
import { z } from "zod";

const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
  publicFiles: es
    .imageBucket()
    .input(
      z.object({
        type: z.enum(["profile", "blog"]),
      }),
    )
    .path(({ input }) => [{ type: input.type }]),
});

export const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});

export type EdgeStoreRouter = typeof edgeStoreRouter;

export const edgeStoreClient = initEdgeStoreClient({
  router: edgeStoreRouter,
});
