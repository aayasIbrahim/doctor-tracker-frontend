import { Skeleton } from "@/components/ui/skeleton";

export function DoctorSkeleton() {
  return (
    <div className="space-y-4">
      <div className="border rounded-xl p-4 space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-12 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}
