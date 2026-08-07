import { CalendarCheck, Clock, ShieldCheck } from 'lucide-react'
import React from 'react'

export default function WhyChooseUs() {
  return (
   <section className="py-20 bg-muted/50 border-t">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-3xl font-bold">Why Choose Doctor Tracker?</h2>
            <p className="text-muted-foreground">
              We provide the best features for your healthcare needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center space-y-3 p-4">
              <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                <CalendarCheck className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg">Easy Scheduling</h3>
              <p className="text-sm text-muted-foreground">
                Book instantly based on real-time doctor availability without
                waiting in queues.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-3 p-4">
              <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg">100% Verified Doctors</h3>
              <p className="text-sm text-muted-foreground">
                All registered medical practitioners are BMDC verified
                specialists.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-3 p-4">
              <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg">24/7 Access</h3>
              <p className="text-sm text-muted-foreground">
                Access your medical history, prescriptions, and records anytime,
                anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>
  )
}
