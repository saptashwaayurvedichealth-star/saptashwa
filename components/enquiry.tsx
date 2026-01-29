'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { Mail, Phone, MessageSquare, User, CheckCircle2, X } from 'lucide-react'

export function Enquiry() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setShowSuccessModal(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        })
      } else {
        throw new Error(data.error || 'Failed to submit enquiry')
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <>
    <section id="enquiry" className="py-12 sm:py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-8 sm:mb-12">
            <span className="text-sm sm:text-base text-primary font-semibold">Get In Touch</span>
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent mt-2">
              Have Questions? We're Here to Help
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-3 sm:mt-4">
              Fill out the form below and our team will get back to you within 24 hours.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Contact Info */}
            <div className="space-y-4 sm:space-y-6">
              <Card className="p-4 sm:p-6">
                <div className="bg-blue-100 w-10 sm:w-12 h-10 sm:h-12 rounded-full flex items-center justify-center mb-2 sm:mb-3 flex-shrink-0">
                    <Phone className="text-primary w-5 sm:w-6 h-5 sm:h-6" />
                  </div>
                  <h3 className="font-semibold text-sm sm:text-lg text-gray-900">Call Us</h3>
                  <p className="text-xs sm:text-sm text-gray-600">+91 97399 91801</p>
              </Card>

              <Card className="p-4 sm:p-6">
                <div className="bg-blue-100 w-10 sm:w-12 h-10 sm:h-12 rounded-full flex items-center justify-center mb-2 sm:mb-3 flex-shrink-0">
                    <Mail className="text-primary w-5 sm:w-6 h-5 sm:h-6" />
                  </div>
                  <h3 className="font-semibold text-sm sm:text-lg text-gray-900">Email Us</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Saptashwaayurvedichealth@gmail.com</p>
              </Card>

              <Card className="p-4 sm:p-6">
                <div className="bg-blue-100 w-10 sm:w-12 h-10 sm:h-12 rounded-full flex items-center justify-center mb-2 sm:mb-3 flex-shrink-0">
                    <MessageSquare className="text-primary w-5 sm:w-6 h-5 sm:h-6" />
                  </div>
                  <h3 className="font-semibold text-sm sm:text-lg text-gray-900">Live Chat</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Available 24/7</p>
              </Card>
            </div>

            {/* Enquiry Form */}
            <Card className="lg:col-span-2 p-4 sm:p-6">
              <div className="mb-4 sm:mb-6">
                <h3 className="font-semibold text-lg sm:text-xl text-gray-900">Send us a Message</h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Fill in your details and we'll respond shortly</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label htmlFor="name" className="text-xs sm:text-sm">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label htmlFor="phone" className="text-xs sm:text-sm">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="+91 XXXXX XXXXX"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="email" className="text-xs sm:text-sm">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="text-sm"
                    />
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="subject" className="text-xs sm:text-sm">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="What is this regarding?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="text-sm"
                    />
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="message" className="text-xs sm:text-sm">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more about your enquiry..."
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="text-sm"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full text-sm sm:text-base py-2 sm:py-3"
                    disabled={loading}
                  >
                    {loading ? 'Submitting...' : 'Submit Enquiry'}
                  </Button>
                </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in fade-in zoom-in duration-300">
            {/* Close Button */}
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Success Animation */}
            <div className="bg-gradient-to-br from-primary/10 via-primary/8 to-primary/10 p-8 text-center">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-primary rounded-full blur-xl opacity-40 animate-pulse"></div>
                <div className="relative bg-primary rounded-full p-6 shadow-xl">
                  <CheckCircle2 className="w-16 h-16 text-white" strokeWidth={2.5} />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Enquiry Submitted Successfully! 🎉
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Thank you for reaching out to us. Our team will review your message and get back to you within <span className="font-semibold text-primary">24-48 hours</span>.
              </p>
              
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
                <p className="text-sm text-primary/80">
                  📧 A confirmation email will be sent to <span className="font-semibold">{formData.email || 'your email'}</span>
                </p>
              </div>

              <Button
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Got it, Thanks!
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
