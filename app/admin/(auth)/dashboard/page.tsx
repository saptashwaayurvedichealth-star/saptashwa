'use client'

import { useEffect, useState } from 'react'
import { Calendar, Users, MessageSquare, Package, Mail, FileText, Briefcase, Star, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'

interface Appointment {
  _id: string
  patientName: string
  service: string
  date: string
  time: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
}

interface Enquiry {
  _id: string
  name: string
  subject: string
  status: 'new' | 'read' | 'replied'
  createdAt: string
}

export default function DashboardPage() {
  const [stats, setStats] = useState({
    appointments: { total: 0, pending: 0, confirmed: 0, completed: 0, cancelled: 0 },
    enquiries: { total: 0, new: 0, read: 0, replied: 0 },
    treatments: 0,
    testimonials: 0,
    products: 0,
    blogs: 0,
    services: 0,
  })
  const [recentAppointments, setRecentAppointments] = useState<Appointment[]>([])
  const [recentEnquiries, setRecentEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [appointmentsRes, enquiriesRes, treatmentsRes, testimonialsRes, productsRes, blogsRes, servicesRes] = await Promise.all([
        fetch('/api/appointments').then(r => r.json()),
        fetch('/api/enquiry').then(r => r.json()),
        fetch('/api/treatments').then(r => r.json()),
        fetch('/api/testimonials').then(r => r.json()),
        fetch('/api/products').then(r => r.json()),
        fetch('/api/blogs').then(r => r.json()),
        fetch('/api/services').then(r => r.json()),
      ])

      const appointments = appointmentsRes.appointments || []
      const enquiries = enquiriesRes.enquiries || []

      setStats({
        appointments: {
          total: appointments.length,
          pending: appointments.filter((a: Appointment) => a.status === 'pending').length,
          confirmed: appointments.filter((a: Appointment) => a.status === 'confirmed').length,
          completed: appointments.filter((a: Appointment) => a.status === 'completed').length,
          cancelled: appointments.filter((a: Appointment) => a.status === 'cancelled').length,
        },
        enquiries: {
          total: enquiries.length,
          new: enquiries.filter((e: Enquiry) => e.status === 'new').length,
          read: enquiries.filter((e: Enquiry) => e.status === 'read').length,
          replied: enquiries.filter((e: Enquiry) => e.status === 'replied').length,
        },
        treatments: treatmentsRes.treatments?.length || 0,
        testimonials: testimonialsRes.testimonials?.length || 0,
        products: productsRes.products?.length || 0,
        blogs: blogsRes.blogs?.length || 0,
        services: servicesRes.services?.length || 0,
      })

      setRecentAppointments(appointments.slice(0, 5))
      setRecentEnquiries(enquiries.slice(0, 5))
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      new: 'bg-blue-100 text-blue-800',
      read: 'bg-gray-100 text-gray-800',
      replied: 'bg-green-100 text-green-800',
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to Saptashwa Ayurvedic Health Admin Panel</p>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/admin/appointments" className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <Calendar size={32} className="opacity-80" />
            <span className="text-4xl font-bold">{stats.appointments.total}</span>
          </div>
          <h3 className="text-lg font-semibold mb-1">Appointments</h3>
          <div className="flex gap-2 text-xs opacity-90">
            <span>Pending: {stats.appointments.pending}</span>
            <span>•</span>
            <span>Confirmed: {stats.appointments.confirmed}</span>
          </div>
        </Link>

        <Link href="/admin/enquiries" className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <Mail size={32} className="opacity-80" />
            <span className="text-4xl font-bold">{stats.enquiries.total}</span>
          </div>
          <h3 className="text-lg font-semibold mb-1">Enquiries</h3>
          <div className="flex gap-2 text-xs opacity-90">
            <span>New: {stats.enquiries.new}</span>
            <span>•</span>
            <span>Replied: {stats.enquiries.replied}</span>
          </div>
        </Link>

        <Link href="/admin/treatments" className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <Briefcase size={32} className="opacity-80" />
            <span className="text-4xl font-bold">{stats.treatments}</span>
          </div>
          <h3 className="text-lg font-semibold mb-1">Treatments</h3>
          <p className="text-xs opacity-90">Ayurvedic treatments</p>
        </Link>

        <Link href="/admin/products" className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <Package size={32} className="opacity-80" />
            <span className="text-4xl font-bold">{stats.products}</span>
          </div>
          <h3 className="text-lg font-semibold mb-1">Products</h3>
          <p className="text-xs opacity-90">Available products</p>
        </Link>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/blogs" className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 rounded-lg">
              <FileText className="text-indigo-600" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.blogs}</div>
              <div className="text-sm text-gray-600">Blog Posts</div>
            </div>
          </div>
        </Link>

        <Link href="/admin/services" className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-teal-50 rounded-lg">
              <Users className="text-teal-600" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.services}</div>
              <div className="text-sm text-gray-600">Services</div>
            </div>
          </div>
        </Link>

        <Link href="/admin/testimonials" className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-pink-50 rounded-lg">
              <Star className="text-pink-600" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.testimonials}</div>
              <div className="text-sm text-gray-600">Testimonials</div>
            </div>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Appointments */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Calendar className="text-blue-600" size={20} />
                Recent Appointments
              </h2>
              <Link href="/admin/appointments" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                View All →
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {recentAppointments.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Calendar className="mx-auto mb-2 text-gray-400" size={32} />
                <p className="text-sm">No recent appointments</p>
              </div>
            ) : (
              recentAppointments.map((appointment) => (
                <div key={appointment._id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{appointment.patientName}</div>
                      <div className="text-sm text-gray-600 mt-1">{appointment.service}</div>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        <Clock size={12} />
                        <span>{new Date(appointment.date).toLocaleDateString()} at {appointment.time}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Enquiries */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-emerald-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Mail className="text-emerald-600" size={20} />
                Recent Enquiries
              </h2>
              <Link href="/admin/enquiries" className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">
                View All →
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {recentEnquiries.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Mail className="mx-auto mb-2 text-gray-400" size={32} />
                <p className="text-sm">No recent enquiries</p>
              </div>
            ) : (
              recentEnquiries.map((enquiry) => (
                <div key={enquiry._id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{enquiry.name}</div>
                      <div className="text-sm text-gray-600 mt-1">{enquiry.subject}</div>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        <Clock size={12} />
                        <span>{new Date(enquiry.createdAt).toLocaleString()}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(enquiry.status)}`}>
                      {enquiry.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Appointment Status Breakdown */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp size={20} className="text-blue-600" />
          Appointment Status Overview
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle size={20} className="text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">Pending</span>
            </div>
            <div className="text-2xl font-bold text-yellow-900">{stats.appointments.pending}</div>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={20} className="text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Confirmed</span>
            </div>
            <div className="text-2xl font-bold text-blue-900">{stats.appointments.confirmed}</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={20} className="text-green-600" />
              <span className="text-sm font-medium text-green-800">Completed</span>
            </div>
            <div className="text-2xl font-bold text-green-900">{stats.appointments.completed}</div>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center gap-2 mb-2">
              <XCircle size={20} className="text-red-600" />
              <span className="text-sm font-medium text-red-800">Cancelled</span>
            </div>
            <div className="text-2xl font-bold text-red-900">{stats.appointments.cancelled}</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/admin/appointments" className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group">
            <Calendar className="text-blue-600 mb-2 group-hover:scale-110 transition-transform" size={24} />
            <h3 className="font-medium text-gray-900 mb-1">Appointments</h3>
            <p className="text-xs text-gray-600">Manage bookings</p>
          </Link>
          <Link href="/admin/enquiries" className="p-4 border-2 border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all group">
            <Mail className="text-emerald-600 mb-2 group-hover:scale-110 transition-transform" size={24} />
            <h3 className="font-medium text-gray-900 mb-1">Enquiries</h3>
            <p className="text-xs text-gray-600">Review messages</p>
          </Link>
          <Link href="/admin/treatments" className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all group">
            <Briefcase className="text-purple-600 mb-2 group-hover:scale-110 transition-transform" size={24} />
            <h3 className="font-medium text-gray-900 mb-1">Treatments</h3>
            <p className="text-xs text-gray-600">Edit services</p>
          </Link>
          <Link href="/admin/blogs" className="p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-all group">
            <FileText className="text-indigo-600 mb-2 group-hover:scale-110 transition-transform" size={24} />
            <h3 className="font-medium text-gray-900 mb-1">Blogs</h3>
            <p className="text-xs text-gray-600">Manage content</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
