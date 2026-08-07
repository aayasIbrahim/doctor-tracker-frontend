import { Card, CardContent } from "@/components/ui/card";
import {
  Activity,
  CalendarCheck,
  Clock,
  ShieldCheck,
  Stethoscope,
  UserCheck,
} from "lucide-react";
import React from "react";

export default function SpecialitesSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Top Specialties</h2>
          <p className="text-muted-foreground">
            Explore doctors by specialized fields
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {[
            { name: "Cardiology", count: "45 Doctors", icon: Activity },
            { name: "Neurology", count: "32 Doctors", icon: Stethoscope },
            { name: "Pediatrics", count: "50 Doctors", icon: UserCheck },
            { name: "Dermatology", count: "28 Doctors", icon: ShieldCheck },
            { name: "Orthopedics", count: "38 Doctors", icon: CalendarCheck },
            { name: "General Medicine", count: "60 Doctors", icon: Clock },
          ].map((specialty, idx) => {
            const Icon = specialty.icon;
            return (
              <Card
                key={idx}
                className="hover:border-primary transition-all duration-300 cursor-pointer text-center group"
              >
                <CardContent className="pt-6 flex flex-col items-center">
                  <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors mb-3">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold text-sm">{specialty.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {specialty.count}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
