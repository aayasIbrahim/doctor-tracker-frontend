
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-primary/10 via-background to-background py-20 md:py-32">
      <div className="container mx-auto px-4 text-center max-w-4xl space-y-6">
        <div className="inline-flex items-center justify-center px-4 py-1.5 text-sm font-medium rounded-full bg-secondary text-secondary-foreground">
          🏥 Your Trusted Healthcare Partner
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground">
          Find & Book the Best <span className="text-primary">Doctors</span>{" "}
          Near You
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          Connect with certified specialists, manage your appointments
          effortlessly, and track your medical history all in one place.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button size="lg" className="w-full sm:w-auto text-base gap-2">
            <Link
              href="/doctors"
              className="flex items-center justify-center gap-2"
            >
              Book Appointment <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto text-base"
          >
            <Link href="/register">Join as Doctor</Link>
          </Button>
        </div>

        {/* Quick Stats Banner */}
        <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-xl bg-card border shadow-xs">
            <h3 className="text-3xl font-bold text-primary">500+</h3>
            <p className="text-sm text-muted-foreground">Expert Doctors</p>
          </div>
          <div className="p-4 rounded-xl bg-card border shadow-xs">
            <h3 className="text-3xl font-bold text-primary">10k+</h3>
            <p className="text-sm text-muted-foreground">Happy Patients</p>
          </div>
          <div className="p-4 rounded-xl bg-card border shadow-xs">
            <h3 className="text-3xl font-bold text-primary">50+</h3>
            <p className="text-sm text-muted-foreground">Specialties</p>
          </div>
          <div className="p-4 rounded-xl bg-card border shadow-xs">
            <h3 className="text-3xl font-bold text-primary">4.9/5</h3>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
