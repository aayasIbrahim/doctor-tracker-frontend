"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

export interface ActionResult {
  success: boolean;
  message?: string;
}

interface DeleteButtonProps {
  id: string;

  deleteAction: (
    id: string,
    prevState?: ActionResult | null | unknown,
    formData?: FormData,
  ) => Promise<ActionResult>;
  title?: string;
  description?: string;
  buttonText?: string;
  variant?: "ghost" | "destructive" | "outline" | "default";
  size?: "default" | "sm" | "lg" | "icon";
  showIconOnly?: boolean;
}

export function DeleteButton({
  id,
  deleteAction,
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. This will permanently delete the record.",
  buttonText = "Delete",
  variant = "ghost",
  size = "icon",
  showIconOnly = true,
}: DeleteButtonProps) {
  const [open, setOpen] = useState(false);

  // Bind the ID as the 1st parameter to the action
  const actionWithId = deleteAction.bind(null, id);
  const [state, formAction, isPending] = useActionState(actionWithId, null);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Deleted successfully!");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- closing the dialog is the intended reaction to the server action's result, not a render loop
      setOpen(false);
    } else {
      toast.error(state.message || "Failed to delete.");
    }
  }, [state]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>
        <Button
          type="button"
          variant={variant}
          size={size}
          className={
            showIconOnly
              ? "h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              : "gap-1.5"
          }
          title={buttonText}
        >
          <Trash2 className="h-4 w-4" />
          {!showIconOnly && <span>{buttonText}</span>}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-md border-border/80 shadow-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-xs text-muted-foreground">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="gap-2 sm:gap-0">
          <AlertDialogCancel disabled={isPending} className="h-8 text-xs">
            Cancel
          </AlertDialogCancel>

          {/* Form inside AlertDialog */}
          <form action={formAction}>
            <Button
              type="submit"
              variant="destructive"
              size="sm"
              disabled={isPending}
              className="h-8 text-xs gap-1.5"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Confirm Delete"
              )}
            </Button>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
