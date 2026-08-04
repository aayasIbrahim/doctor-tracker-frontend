"use client";

import { Button } from "@/components/ui/button";
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
// import { IDoctor } from "@/types";
import {
  PencilIcon,
  PlusIcon,
  Stethoscope,
  Building2,
  Phone,
  Mail,
  User,
  Loader2,
} from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { createDoctor, updateDoctor } from "../../_action/doctorActions";
import { IDoctor } from "@/lib/types";

type DoctorFormDialogProps = {
  mode: "create" | "edit";
  doctor?: IDoctor;
};

export function DoctorFormDialog({ mode, doctor }: DoctorFormDialogProps) {
  const [open, setOpen] = useState(false);

//   Bind doctor ID for edit mode
  const action =
    mode === "edit" && doctor
      ? updateDoctor.bind(null, doctor._id)
      : createDoctor;

  const [state, formAction, pending] = useActionState(action, null);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(
        state.message ||
          (mode === "edit"
            ? "Doctor updated successfully"
            : "Doctor created successfully")
      );
       // eslint-disable-next-line react-hooks/set-state-in-effect -- closing the dialog is the intended reaction to the server action's result, not a render loop
            setOpen(false);
      setOpen(false);
    } else {
      toast.error(state.message || "Something went wrong");
    }
  }, [state, mode]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger >
        {mode === "edit" ? (
          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
            <PencilIcon className="h-3.5 w-3.5" />
            Edit
          </Button>
        ) : (
          <Button size="sm" className="gap-1.5 text-xs font-medium">
            <PlusIcon className="h-4 w-4" />
            Add New Doctor
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-md sm:max-w-lg border-border/80 shadow-lg">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-primary" />
            {mode === "edit" ? "Edit Doctor Profile" : "Register New Doctor"}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            {mode === "edit"
              ? "Update medical specialist details below."
              : "Fill in the required information to add a doctor to the system."}
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-4 py-2">
          {/* Doctor Name */}
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-xs font-semibold">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="name"
                name="name"
                placeholder="Dr. Marcus Vance"
                defaultValue={doctor?.name}
                required
                className="pl-9 h-9 text-xs"
              />
            </div>
          </div>

          {/* Specialization & Hospital Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="specialization" className="text-xs font-semibold">
                Specialization <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Stethoscope className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="specialization"
                  name="specialization"
                  placeholder="Cardiology"
                  defaultValue={doctor?.specialization}
                  required
                  className="pl-9 h-9 text-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="hospital" className="text-xs font-semibold">
                Hospital / Clinic <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="hospital"
                  name="hospital"
                  placeholder="Central Hospital"
                  defaultValue={doctor?.hospital}
                  required
                  className="pl-9 h-9 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Phone & Email Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-xs font-semibold">
                Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="phone"
                  name="phone"
                  placeholder="+1-555-015-1122"
                  defaultValue={doctor?.phone}
                  className="pl-9 h-9 text-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold">
                Email Address <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="doctor@hospital.org"
                  defaultValue={doctor?.email}
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
                ? "Update Doctor"
                : "Create Doctor"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}