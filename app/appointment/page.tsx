'use client';

import { useState } from 'react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import TimeSlotPicker from '@/components/time-slot-picker';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle2, X } from 'lucide-react';

export default function AppointmentPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    message: '',
  });

  const services = [
    'Ayurvedic Consultation',
    'Panchakarma Therapy',
    'Herbal Treatment',
    'Yoga & Meditation',
    'Diet & Nutrition Counseling',
    'Lifestyle Diseases Management',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.time) {
      toast({
        title: 'Error',
        description: 'Please select a time slot',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Save the submitted data before clearing the form
        setSubmittedData({ ...formData });
        setShowSuccessModal(true);
        setFormData({
          patientName: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          service: '',
          message: '',
        });
      } else {
        throw new Error(data.error || 'Failed to book appointment');
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Get minimum date (today)
  const minDate = new Date().toISOString().split('T')[0];

  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="py-12 sm:py-20 bg-gradient-to-br from-primary/5 via-white to-primary/5">
        <div className="w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light heading-gradient mb-3 sm:mb-4">
              Book Your Appointment
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
              Schedule your visit with our experienced Ayurvedic practitioners. Choose your preferred date and time.
            </p>
          </div>

          <Card className="p-4 sm:p-6 lg:p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary flex-shrink-0" />
                  Personal Information
                </h3>
                
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {/* Appointment Details */}
              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                  Appointment Details
                </h3>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Service Required *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      min={minDate}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Time Slot Picker */}
                <div className="border border-gray-200 rounded-lg p-3 sm:p-4 bg-gray-50 overflow-x-auto">
                  <TimeSlotPicker
                    selectedDate={formData.date}
                    selectedTime={formData.time}
                    onTimeSelect={(time) => setFormData({ ...formData, time })}
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Additional Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                    placeholder="Any specific health concerns or questions..."
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 sm:py-6 text-base sm:text-lg font-semibold bg-primary text-primary-foreground hover:opacity-90"
                >
                  {loading ? 'Booking Appointment...' : 'Book Appointment'}
                </Button>
              </div>
            </form>
          </Card>

          {/* Info Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
            <Card className="p-4 sm:p-6 text-center">
              <Calendar className="w-10 sm:w-12 h-10 sm:h-12 text-emerald-500 mx-auto mb-3 sm:mb-4 flex-shrink-0" />
              <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">Flexible Scheduling</h4>
              <p className="text-xs sm:text-sm text-gray-600">Choose from available time slots that suit your schedule</p>
            </Card>

            <Card className="p-4 sm:p-6 text-center">
              <User className="w-10 sm:w-12 h-10 sm:h-12 text-emerald-500 mx-auto mb-3 sm:mb-4 flex-shrink-0" />
              <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">Expert Practitioners</h4>
              <p className="text-xs sm:text-sm text-gray-600">Consult with experienced Ayurvedic doctors</p>
            </Card>

            <Card className="p-4 sm:p-6 text-center">
              <CheckCircle2 className="w-10 sm:w-12 h-10 sm:h-12 text-emerald-500 mx-auto mb-3 sm:mb-4 flex-shrink-0" />
              <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">Quick Confirmation</h4>
              <p className="text-xs sm:text-sm text-gray-600">Get instant confirmation via email and SMS</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-3 sm:p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto overflow-hidden animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-3 sm:top-4 right-3 sm:right-4 text-gray-400 hover:text-gray-600 transition-colors z-50"
            >
              <X className="w-5 sm:w-6 h-5 sm:h-6" />
            </button>

            <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-teal-50 p-6 sm:p-8 text-center">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-emerald-400 rounded-full blur-xl opacity-40 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full p-4 sm:p-6 shadow-xl">
                  <CheckCircle2 className="w-12 sm:w-16 h-12 sm:h-16 text-white" strokeWidth={2.5} />
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                Appointment Booked Successfully! 🎉
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                Your appointment request has been received. Our team will confirm your appointment shortly via email and phone.
              </p>
              
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                <p className="text-xs sm:text-sm text-emerald-600">
                  📧 A confirmation email will be sent to <span className="font-semibold text-ellipsis overflow-hidden">{submittedData?.email || 'your email'}</span>
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href={`https://wa.me/918722920862?text=${encodeURIComponent(`🏥 *New Appointment Booking*\n\n📋 *Patient Details:*\nName: ${submittedData?.patientName || ''}\nEmail: ${submittedData?.email || ''}\nPhone: ${submittedData?.phone || ''}\n\n🗓️ *Appointment Details:*\nService: ${submittedData?.service || ''}\nDate: ${submittedData?.date || ''}\nTime: ${submittedData?.time || ''}\n${submittedData?.message ? `\n💬 *Additional Message:*\n${submittedData.message}` : ''}\n\nThank you!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    type="button"
                    className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold py-2 sm:py-3 text-sm sm:text-base rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Share on WhatsApp
                  </Button>
                </a>
                <Button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-600 text-white font-semibold py-2 sm:py-3 text-sm sm:text-base rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Got it, Thanks!
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
