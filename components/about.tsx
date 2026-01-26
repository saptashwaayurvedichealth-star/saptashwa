'use client'

import { Award, Users, Heart, TrendingUp } from 'lucide-react'

export function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="relative">
            <div className="bg-blue-100 rounded-2xl h-[500px] flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-8xl mb-4">👨‍⚕️</div>
                <p className="text-gray-600 text-lg">Professional Medical Team</p>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-6">
            <div>
              <span className="text-blue-600 font-semibold">About Us</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-2">
                Committed to Your Health & Wellness
              </h2>
            </div>

            <p className="text-gray-600 leading-relaxed">
              We are a leading healthcare provider dedicated to delivering exceptional medical services. 
              With years of experience, our team of expert doctors and healthcare professionals 
              are committed to providing personalized care to each patient.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Our state-of-the-art facility is equipped with the latest medical technology, ensuring 
              accurate diagnoses and effective treatments. We believe in a patient-centric approach, 
              focusing on preventive care and long-term health management.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
