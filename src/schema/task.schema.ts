import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(3, { message: "Title is too short" }),
  description: z.string().min(3, { message: "Description is too short" }),
  dueDate: z.coerce.date({ message: "Please enter a valid date" }),
  progress: z
    .enum(["todo", "in_progress", "completed"], {
      required_error: "Please select an option",
      invalid_type_error: "Please select an option",
    })
    .default("todo"),
});

export type TTaskSchema = z.infer<typeof taskSchema>;
