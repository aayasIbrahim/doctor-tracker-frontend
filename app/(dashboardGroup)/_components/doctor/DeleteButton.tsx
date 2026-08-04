
"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ConfirmDeleteButtonProps {
  id: string;
  deleteAction: (id: string) => Promise<{ success: boolean; message?: string }>;
  title?: string;
}

export function DeleteButton({ id, deleteAction, title = "Delete Item" }: ConfirmDeleteButtonProps) {

  const actionWithId = deleteAction.bind(null, id);
  const [state, formAction, isPending] = useActionState(actionWithId, null);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Deleted successfully!");
    } else {
      toast.error(state.message || "Failed to delete.");
    }
  }, [state]);

  return (
    <form action={formAction}>
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        disabled={isPending}
        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
        title={title}
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </Button>
    </form>
  );
}