import { createRouteHandler } from "uploadthing/next";
import { xfileRouter } from "./core";

export const {GET,POST}=createRouteHandler({
    router:xfileRouter
})