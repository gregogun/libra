import { saveTx } from "@/lib/api";
import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormRoot,
  FormSubmit,
} from "@/ui/Form";
import { onWindowFocus } from "@/utils/onWindowFocus";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  Flex,
  IconButton,
  TextField,
  Typography,
} from "@aura-ui/react";
import { Cross2Icon } from "@radix-ui/react-icons";
import {
  focusManager,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useConnect } from "arweave-wallet-ui-test";
import { FormikErrors, useFormik } from "formik";
import { useState } from "react";

interface CreateDialogProps {
  children: React.ReactNode;
}

interface BookmarkFormValues {
  name: string;
  targetId: string;
}

export const CreateDialog = ({ children }: CreateDialogProps) => {
  const [uploadError, setUploadError] = useState<string>();
  const { walletAddress } = useConnect();
  const queryClient = useQueryClient();

  // move logic outside of dialog
  const mutation = useMutation({
    mutationFn: saveTx,
    onSuccess: () => {
      formik.setSubmitting(false);
      formik.resetForm();
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
    onError: (error: any) => {
      console.log("error is", error);

      const errorMessage = error.toString();

      if (errorMessage.includes("Transaction does not exist.")) {
        setUploadError(errorMessage);
      } else {
        console.error(error);
        setUploadError(
          "Something went wrong trying to create your bookmark. Please try again."
        );
      }
    },
  });

  const formik = useFormik<BookmarkFormValues>({
    initialValues: {
      name: "",
      targetId: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: (values) => {
      const errors: FormikErrors<BookmarkFormValues> = {};

      // error checking
      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      if (uploadError) {
        setUploadError("");
      }
      setSubmitting(true);
      console.log(values);

      mutation.mutate({
        name: values.name,
        targetId: values.targetId,
        address: walletAddress,
      });
    },
  });

  return (
    <Dialog onOpenChange={() => formik.resetForm()}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogPortal>
        <DialogOverlay
          css={{
            backdropFilter: "blur(1px)",
          }}
        />
        <DialogContent
          css={{
            backgroundColor: "$indigo2",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            mx: "auto",
            my: "auto",
            transform: "translate(0, -100px)",
            maxH: "max-content",
          }}
        >
          <DialogClose asChild>
            <IconButton
              variant="outline"
              colorScheme="indigo"
              css={{
                position: "fixed",
                top: 12,
                right: 12,
                br: "$round",
              }}
              aria-label="Close Dialog"
              size="1"
            >
              <Cross2Icon />
            </IconButton>
          </DialogClose>
          <DialogTitle css={{ mb: "$5" }} asChild>
            <Typography size="4" weight="6" contrast="hiContrast">
              Bookmark a transaction
            </Typography>
          </DialogTitle>
          <FormRoot onSubmit={formik.handleSubmit}>
            <FormField name="name">
              <Flex justify="between" align="center">
                <FormLabel>Name</FormLabel>
                <FormMessage match="valueMissing">
                  Please provide a name for this bookmark.
                </FormMessage>
                <FormMessage match="tooLong">Name is too long.</FormMessage>
                <FormMessage match="tooShort">Name is too short.</FormMessage>
              </Flex>
              <FormControl asChild>
                <TextField
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  minLength={3}
                  maxLength={80}
                  required
                  css={{
                    "&[type]": {
                      backgroundColor: "inherit",
                      boxShadow: "0 0 0 1px $colors$indigo7",
                      color: "$indigo11",

                      "&::placeholder": {
                        color: "$indigo8",
                      },
                    },
                  }}
                  variant="outline"
                />
              </FormControl>
            </FormField>
            <FormField name="targetId">
              <Flex justify="between" align="center">
                <FormLabel>Transaction ID</FormLabel>
                <FormMessage match="valueMissing">
                  Please provide a transaction id.
                </FormMessage>
                <FormMessage match="tooShort">
                  Incorrect length. ID must be 43 characters long.
                </FormMessage>
                <FormMessage match="tooLong">
                  Incorrect length. ID must be 43 characters long.
                </FormMessage>
              </Flex>
              <FormControl asChild>
                <TextField
                  type="text"
                  value={formik.values.targetId}
                  onChange={formik.handleChange}
                  minLength={43}
                  maxLength={43}
                  required
                  css={{
                    "&[type]": {
                      backgroundColor: "inherit",
                      boxShadow: "0 0 0 1px $colors$indigo7",
                      color: "$indigo11",

                      "&::placeholder": {
                        color: "$indigo8",
                      },
                    },
                  }}
                  variant="outline"
                />
              </FormControl>
            </FormField>

            <Flex
              css={{ mt: "$10" }}
              justify={uploadError ? "between" : "end"}
              align="center"
              gap="5"
            >
              {uploadError && (
                <Typography
                  css={{
                    maxW: "30ch",
                  }}
                  size="2"
                  colorScheme="red"
                >
                  {uploadError}
                </Typography>
              )}
              <FormSubmit asChild>
                <Button
                  disabled={formik.isSubmitting}
                  colorScheme="indigo"
                  variant="solid"
                >
                  {formik.isSubmitting
                    ? "Submitting..."
                    : "Bookmark Transaction"}
                </Button>
              </FormSubmit>
            </Flex>
          </FormRoot>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
