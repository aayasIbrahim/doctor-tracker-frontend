import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

export default function QuickSearchSection() {
  return (
    <section className="container mx-auto px-4 -mt-8 relative z-10">
      <div className="bg-card border rounded-2xl p-6 shadow-xl max-w-3xl mx-auto flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search doctor, specialty, or condition..."
            className="pl-9 h-12"
          />
        </div>
        <Button size="lg" className="w-full md:w-auto px-8 h-12">
          Search
        </Button>
      </div>
    </section>
  );
}
