import { z } from "zod";

export const formSchema = z.object({
  jsonContent: z
    .string()
    .min(1, {
      message: "JSON content is empty.",
    })
    .refine(
      (data) => {
        try {
          JSON.parse(data);
          return true;
        } catch {
          return false;
        }
      },
      {
        message: "JSON content is invalid.",
      }
    ),
});
