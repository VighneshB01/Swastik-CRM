import { SaveButton } from "@/components/admin/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  CreateBase,
  Form,
  useNotify,
  useRedirect,
  useResourceContext,
  useTranslate,
  type CreateBaseProps,
  type FormProps,
} from "ra-core";
import { type ReactNode } from "react";

export interface CreateSheetProps extends CreateBaseProps {
  
  children: ReactNode;

  
  open: boolean;

  
  onOpenChange: (open: boolean) => void;

  
  title?: ReactNode;

  
  defaultValues?: FormProps["defaultValues"];
}

export const CreateSheet = ({
  children,
  open,
  onOpenChange,
  title = "Create",
  redirect: redirectTo = "show",
  mutationOptions,
  defaultValues,
  ...createBaseProps
}: CreateSheetProps) => {
  const resource = useResourceContext(createBaseProps);
  const translate = useTranslate();
  const notify = useNotify();
  const redirect = useRedirect();

  // Handle success - close sheet in addition to default behavior
  const handleSuccess = (...args: any[]) => {
    if (mutationOptions?.onSuccess) {
      return mutationOptions.onSuccess(
        ...(args as Parameters<typeof mutationOptions.onSuccess>),
      );
    }
    const [data] = args;
    notify(`resources.${resource}.notifications.created`, {
      type: "info",
      messageArgs: {
        smart_count: 1,
        _: translate(`ra.notification.created`, {
          smart_count: 1,
        }),
      },
      undoable: createBaseProps.mutationMode === "undoable",
    });
    redirect(redirectTo, resource, data.id, data);
    onOpenChange(false);
  };

  const enhancedMutationOptions = {
    ...mutationOptions,
    onSuccess: handleSuccess,
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-dvh flex flex-col">
        <CreateBase
          {...createBaseProps}
          redirect={redirectTo}
          mutationOptions={enhancedMutationOptions}
        >
          <Form
            defaultValues={defaultValues}
            className="h-dvh flex-1 flex flex-col"
          >
            <SheetHeader className="border-b">
              <SheetTitle>
                {typeof title === "string" ? (
                  <span className="text-xl font-semibold">{title}</span>
                ) : (
                  title
                )}
              </SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto flex flex-col gap-3 p-4">
              {children}
            </div>

            <SheetFooter className="border-t">
              <div className="flex w-full gap-4">
                <SheetClose asChild>
                  <Button variant="ghost" className="flex-1">
                    Close
                  </Button>
                </SheetClose>
                <SaveButton className="flex-1" />
              </div>
            </SheetFooter>
          </Form>
        </CreateBase>
      </SheetContent>
    </Sheet>
  );
};
