import { styled } from "@aura-ui/react";
import * as FormPrimitive from "@radix-ui/react-form";

export const FormRoot = styled(FormPrimitive.Root, {
  width: "100%",
});

export const FormField = styled(FormPrimitive.Field, {
  display: "grid",
  mb: "$5",
});

export const FormLabel = styled(FormPrimitive.Label, {
  fontSize: "$2",
  lineHeight: "$7",
  fontWeight: "$5",
  color: "inherit",
});

export const FormMessage = styled(FormPrimitive.Message, {
  fontSize: "$1",
  lineHeight: "$1",
  color: "inherit",
  opacity: 0.7,
});

export const FormControl = styled(FormPrimitive.Control);
export const FormSubmit = styled(FormPrimitive.Submit);
