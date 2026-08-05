"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  PencilIcon,
  PlusIcon,
  User,
  Phone,
  Activity,
  Calendar,
  Loader2,
} from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { IPatient } from "@/lib/types";
import {
  addPatientUnderDoctor,
  updatePatient,
} from "../../_action/patientAction";

type PatientFormDialogProps = {
  mode: "create" | "edit";
  doctorId: string;
  patient?: IPatient;
};

export function PatientFormDialog({
  mode,
  doctorId,
  patient,
}: PatientFormDialogProps) {
  const [open, setOpen] = useState(false);

  // Dynamic Server Action binding based on mode
  const action =
    mode === "edit" && patient
      ? updatePatient.bind(null, patient._id)
      : addPatientUnderDoctor.bind(null, doctorId || "");

  const [state, formAction, pending] = useActionState(action, null);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(
        state.message ||
          (mode === "edit"
            ? "Patient updated successfully"
            : "Patient added successfully"),
      );
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(false);
    } else {
      toast.error(state.message || "Something went wrong");
    }
  }, [state, mode]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={
          mode === "edit"
            ? buttonVariants({ variant: "outline", size: "sm" }) +
              " h-8 gap-1.5 text-xs"
            : buttonVariants({ size: "sm" }) + " gap-1.5 text-xs font-medium"
        }
      >
        {mode === "edit" ? (
          <>
            <PencilIcon className="h-3.5 w-3.5" />
            Edit
          </>
        ) : (
          <>
            <PlusIcon className="h-4 w-4" />
            Add Patient
          </>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-md sm:max-w-lg border-border/80 shadow-lg">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            {mode === "edit" ? "Edit Patient Details" : "Assign New Patient"}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            {mode === "edit"
              ? "Update existing patient record."
              : "Fill details to assign a patient under this doctor."}
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-4 py-2">
          {/* Patient Name */}
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-xs font-semibold">
              Patient Name <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                defaultValue={patient?.name || ""}
                required
                className="pl-9 h-9 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Age */}
            <div className="space-y-1.5">
              <Label htmlFor="age" className="text-xs font-semibold">
                Age <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="age"
                  type="number"
                  name="age"
                  placeholder="e.g. 28"
                  defaultValue={patient?.age || ""}
                  required
                  className="pl-9 h-9 text-xs"
                />
              </div>
            </div>

            {/* Gender */}
            <div className="space-y-1.5">
              <Label htmlFor="gender" className="text-xs font-semibold">
                Gender <span className="text-destructive">*</span>
              </Label>
              <select
                id="gender"
                name="gender"
                defaultValue={patient?.gender || "Male"}
                required
                className="w-full h-9 px-3 rounded-md border border-input bg-background text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Phone */}
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-xs font-semibold">
                Phone Number <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="phone"
                  name="phone"
                  placeholder="+1234567890"
                  defaultValue={patient?.phone || ""}
                  required
                  className="pl-9 h-9 text-xs"
                />
              </div>
            </div>

            {/* Medical Condition */}
            <div className="space-y-1.5">
              <Label htmlFor="condition" className="text-xs font-semibold">
                Condition / Diagnosis{" "}
                <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Activity className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="condition"
                  name="condition"
                  placeholder="e.g. Fever, Hypertension"
                  defaultValue={patient?.condition || ""}
                  required
                  className="pl-9 h-9 text-xs"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="pt-3 gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setOpen(false)}
              className="h-9 text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={pending}
              className="h-9 text-xs gap-1.5"
            >
              {pending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {pending
                ? "Saving..."
                : mode === "edit"
                  ? "Update Patient"
                  : "Add Patient"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
