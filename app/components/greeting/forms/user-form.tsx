import { zodResolver } from "@hookform/resolvers/zod";
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

const UserFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  gender: z.enum(["male", "female"]),
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
    },
  });

  function onSubmit(data: z.infer<typeof UserFormSchema>) {
    console.log(data);

    localStorage.setItem("user", JSON.stringify(data));
    setOpen?.(false);
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Halo Selamat Datang!</DialogTitle>
          </DialogHeader>

          <div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

              <Button type="submit">Submit</Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
