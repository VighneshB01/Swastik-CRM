import { DeleteButton } from "@/components/admin";
import { SaveButton } from "@/components/admin/form";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  EditBase,
  Form,
  useNotify,
  useRedirect,
  useResourceContext,
  useTranslate,
  type EditBaseProps,
  type FormProps,
} from "ra-core";
import { type ReactNode } from "react";

export interface EditSheetProps extends EditBaseProps {
  
  children: ReactNode;

  
  open: boolean;

  
  onOpenChange: (open: boolean) => void;

  
  title?: ReactNode;

  
  defaultValues?: FormProps["defaultValues"];

  
  deleteButton?: ReactNode;
}

export const EditSheet = ({
  children,
  open,
  onOpenChange,
  title = "Edit",
  redirect: redirectTo = "show",
  mutationOptions,
  mutationMode = "undoable",
  defaultValues,
  deleteButton,
  ...editBaseProps
}: EditSheetProps) => {
  const resource = useResourceContext(editBaseProps);
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
    notify(`resources.${resource}.notifications.updated`, {
      type: "info",
      messageArgs: {
        smart_count: 1,
        _: translate(`ra.notification.updated`, {
          smart_count: 1,
        }),
      },
      undoable: mutationMode === "undoable",
    });
    redirect(redirectTo, resource, data.id, data);
    onOpenChange(false);
  };

  const enhancedMutationOptions = {
    ...mutationOptions,
    onSuccess: handleSuccess,
  };

  const defaultDeleteButton = (
    <DeleteButton variant="destructive" className="flex-1" />
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-dvh flex flex-col">
        <EditBase
          {...editBaseProps}
          redirect={redirectTo}
          mutationOptions={enhancedMutationOptions}
          mutationMode={mutationMode}
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
                {deleteButton || defaultDeleteButton}
                <SaveButton className="flex-1" />
              </div>
            </SheetFooter>
          </Form>
        </EditBase>
      </SheetContent>
    </Sheet>
  );
};
