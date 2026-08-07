import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Star } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function FeaturedDoctorSection() {
  return (
    <section className="py-20 container mx-auto px-4">
        <div className="">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Featured Doctors
              </h2>
              <p className="text-muted-foreground mt-2">
                Book appointments with our top-rated specialists
              </p>
            </div>
            <Button variant="outline">
              <Link href="/doctors">View All Doctors</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                name: "Dr. Sarah Ahmed",
                specialty: "Cardiologist",
                experience: "10+ Years Exp.",
                rating: 4.9,
                reviews: 120,
              },
              {
                name: "Dr. Mahmud Hassan",
                specialty: "Neurologist",
                experience: "8+ Years Exp.",
                rating: 4.8,
                reviews: 95,
              },
              {
                name: "Dr. Nusrat Jahan",
                specialty: "Pediatrician",
                experience: "12+ Years Exp.",
                rating: 5.0,
                reviews: 150,
              },
            ].map((doc, idx) => (
              <Card
                key={idx}
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardHeader className="p-0">
                  <div className="h-48 bg-muted flex items-center justify-center text-muted-foreground text-sm font-medium">
                    [ Doctor Image Placeholder ]
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{doc.name}</CardTitle>
                      <CardDescription className="text-primary font-medium">
                        {doc.specialty}
                      </CardDescription>
                    </div>
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {doc.rating}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {doc.experience} • {doc.reviews} Reviews
                  </p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button className="w-full">
                    <Link href="/doctors/1">Book Appointment</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
  )
}
