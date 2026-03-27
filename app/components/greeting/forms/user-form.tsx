import { z } from "zod";

const UserFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  gender: z.enum(["male", "female"]),
});

export function UserForm() {
  return <div></div>;
}
