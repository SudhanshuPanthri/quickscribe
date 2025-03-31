import { XfileRouter } from "@/app/api/uploadthing/core";

import { generateReactHelpers } from "@uploadthing/react";

export const {useUploadThing}=generateReactHelpers<XfileRouter>();