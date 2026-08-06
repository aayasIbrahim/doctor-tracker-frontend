"use client";

import { useState, useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

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
import { Button } from "@/components/ui/button";

interface DeleteButtonProps {
  id: string;
  deleteAction: (id: string) => Promise<{ success: boolean; message?: string }>;
  title?: string;
  description?: string;
  buttonText?: string;
  showIconOnly?: boolean;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export function DeleteButton({
  id,
  deleteAction,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  buttonText = "Delete",
  showIconOnly = true,
  variant = "ghost",
  size = "sm",
}: DeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const result = await deleteAction(id);
        if (result?.success) {
          toast.success(result.message || "Deleted successfully");
          setOpen(false);
        } else {
          toast.error(result?.message || "Failed to delete");
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger >
        <Button
          type="button"
          variant={variant}
          size={size}
          className={
            showIconOnly
              ? "h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 p-0"
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

          <Button
            type="button"
            onClick={handleDelete}
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
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}