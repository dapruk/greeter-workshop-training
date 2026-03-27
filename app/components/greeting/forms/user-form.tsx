import { zodResolver } from "@hookform/resolvers/zod";
import { MenuSquareIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { supabaseClient } from "~/lib/supabase-client";

const UserFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  gender: z.enum(["male", "female"]),
  message: z.string().min(1, "Message is required"),
});

interface UserFormProps {
  open: boolean;
  setOpen?: (open: boolean) => void;
}

export function UserForm({ open, setOpen }: UserFormProps) {
  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      name: "",
      gender: undefined,
      message: "",
    },
  });

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        form.reset(user);
      } catch (error) {
        console.error("Failed to parse user from local storage", error);
      }
    }
  }, [form]);

  async function onSubmit(data: z.infer<typeof UserFormSchema>) {
    try {
      const { error } = await supabaseClient.from("cards").insert({
        author: data.name,
        message: data.message,
      });

      if (error) {
        console.error("Error inserting data into Supabase:", error);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data));
      setOpen?.(false);
    } catch (err) {
      console.error("Unexpected error during form submission:", err);
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="min-w-125 py-4">
          <DialogHeader className="flex flex-col items-center gap-4 justify-center drop-shadow-2xl">
            <div className="bg-green-300 rounded-lg p-2 w-fit text-green-700">
              <HugeiconsIcon icon={MenuSquareIcon} />
            </div>
            <DialogTitle className="text-4xl text-center font-bold">
              Halo, Selamat Datang!
            </DialogTitle>
          </DialogHeader>

          <div className="justify-center">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 flex flex-col items-center"
            >
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Rusdi"
                      autoComplete="on"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="gender"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldSet className="w-full max-w-xs">
                      <FieldLegend variant="label">Gender</FieldLegend>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <Field orientation="horizontal">
                          <RadioGroupItem value="male" id="gender-male" />
                          <FieldLabel
                            htmlFor="gender-male"
                            className="font-normal"
                          >
                            Male
                          </FieldLabel>
                        </Field>
                        <Field orientation="horizontal">
                          <RadioGroupItem value="female" id="gender-female" />
                          <FieldLabel
                            htmlFor="gender-female"
                            className="font-normal"
                          >
                            Female
                          </FieldLabel>
                        </Field>
                      </RadioGroup>
                    </FieldSet>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="message"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Leave a message
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Rusdi"
                      autoComplete="on"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button
                type="submit"
                size="lg"
                disabled={form.formState.isSubmitting}
                className="justify-center w-50 h-12 rounded-lg text-lg uppercase bg-linear-to-r from-green-800 to-green-500 text-white disabled:opacity-50"
              >
                {form.formState.isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
