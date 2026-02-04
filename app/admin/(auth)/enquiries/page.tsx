'use client'

import { useEffect, useState } from 'react'
import { Mail, Phone, Calendar, Eye, Trash2, Send, X } from 'lucide-react'

interface Enquiry {
  _id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: 'new' | 'read' | 'replied'
  createdAt: string
}

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [sendingEmail, setSendingEmail] = useState<string | null>(null)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null)
  const [showDetail, setShowDetail] = useState(false)
  const [selectedEnquiryDetail, setSelectedEnquiryDetail] = useState<Enquiry | null>(null)
  const [filters, setFilters] = useState({
    status: 'all',
    dateFrom: '',
    dateTo: ''
  })
  const [emailData, setEmailData] = useState({
    subject: '',
    message: '',
  })

  useEffect(() => {
    fetchEnquiries()
  }, [])

  const fetchEnquiries = async () => {
    try {
      const res = await fetch('/api/enquiry')
      const data = await res.json()
      setEnquiries(data.enquiries || [])
    } catch (error) {
      console.error('Failed to fetch enquiries:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/enquiry/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      fetchEnquiries()
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return

    try {
      await fetch(`/api/enquiry/${id}`, { method: 'DELETE' })
      fetchEnquiries()
    } catch (error) {
      console.error('Failed to delete enquiry:', error)
    }
  }

  const openEmailModal = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry)
    setEmailData({
      subject: `Re: ${enquiry.subject}`,
      message: `Dear ${enquiry.name},\n\nThank you for your enquiry regarding "${enquiry.subject}".\n\n`,
    })
    setShowEmailModal(true)
  }

  const handleView = (enquiry: Enquiry) => {
    setSelectedEnquiryDetail(enquiry)
    setShowDetail(true)
  }

  const filteredEnquiries = enquiries.filter(enquiry => {
    if (filters.status !== 'all' && enquiry.status !== filters.status) return false
    if (filters.dateFrom && new Date(enquiry.createdAt) < new Date(filters.dateFrom)) return false
    if (filters.dateTo && new Date(enquiry.createdAt) > new Date(filters.dateTo)) return false
    return true
  })

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedEnquiry) return

    setSendingEmail(selectedEnquiry._id)

    try {
      const response = await fetch('/api/send-reply-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: selectedEnquiry.email,
          subject: emailData.subject,
          message: emailData.message,
          enquiryId: selectedEnquiry._id,
        }),
      })

      if (response.ok) {
        alert('Email sent successfully!')
        await updateStatus(selectedEnquiry._id, 'replied')
        setShowEmailModal(false)
        setSelectedEnquiry(null)
        setEmailData({ subject: '', message: '' })
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || errorData.details || 'Failed to send email')
      }
    } catch (error) {
      console.error('Failed to send email:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to send email. Please try again.'
      alert(`Failed to send email: ${errorMessage}\n\nPlease ensure SMTP settings are configured in your environment variables.`)
    } finally {
      setSendingEmail(null)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Enquiries</h1>
        <p className="text-sm sm:text-base text-gray-600">Manage patient enquiries</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Date From</label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Date To</label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        {(filters.status !== 'all' || filters.dateFrom || filters.dateTo) && (
          <button
            onClick={() => setFilters({ status: 'all', dateFrom: '', dateTo: '' })}
            className="mt-3 text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear Filters
          </button>
        )}
      </div>

      {filteredEnquiries.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Mail className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-600">No enquiries found</p>
        </div>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="block md:hidden divide-y divide-gray-200 bg-white rounded-lg border border-gray-200">
            {filteredEnquiries.map((enquiry) => (
              <div key={enquiry._id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{enquiry.name}</p>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded mt-1 ${
                      enquiry.status === 'new' ? 'bg-blue-100 text-blue-800' :
                      enquiry.status === 'read' ? 'bg-gray-100 text-gray-800' :
                      'bg-teal-100 text-teal-800'
                    }`}>
                      {enquiry.status}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail size={12} />
                    <span className="break-all">{enquiry.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={12} />
                    <span>{enquiry.phone}</span>
                  </div>
                  <div>
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded">{enquiry.subject}</span>
                  </div>
                  <div className="text-gray-700 text-sm mt-2">
                    <p className="line-clamp-3">{enquiry.message}</p>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(enquiry.createdAt).toLocaleString()}
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  <select
                    value={enquiry.status}
                    onChange={(e) => updateStatus(enquiry._id, e.target.value)}
                    className="flex-1 px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                  </select>
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => handleView(enquiry)}
                    className="flex-1 px-3 py-2 text-xs text-gray-700 border border-gray-300 rounded hover:bg-gray-50 flex items-center justify-center gap-1"
                  >
                    <Eye size={14} /> View
                  </button>
                  <button
                    onClick={() => openEmailModal(enquiry)}
                    className="flex-1 px-3 py-2 text-xs text-emerald-600 border border-emerald-300 rounded hover:bg-emerald-50 flex items-center justify-center gap-1"
                  >
                    <Send size={14} /> Reply
                  </button>
                  <button
                    onClick={() => handleDelete(enquiry._id)}
                    className="flex-1 px-3 py-2 text-xs text-red-600 border border-red-300 rounded hover:bg-red-50 flex items-center justify-center gap-1"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEnquiries.map((enquiry) => (
                    <tr key={enquiry._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div className="flex flex-col">
                          <span>{enquiry.name}</span>
                          <span className="text-xs text-gray-500">{new Date(enquiry.createdAt).toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <div className="flex flex-col gap-1">
                          <span className="flex items-center gap-2"><Mail size={14} />{enquiry.email}</span>
                          <span className="flex items-center gap-2"><Phone size={14} />{enquiry.phone}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <span className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded">{enquiry.subject}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                        {enquiry.message}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded ${
                            enquiry.status === 'new' ? 'bg-blue-100 text-blue-800' :
                            enquiry.status === 'read' ? 'bg-gray-100 text-gray-800' :
                            'bg-teal-100 text-teal-800'
                          }`}>
                            {enquiry.status}
                          </span>
                          <select
                            value={enquiry.status}
                            onChange={(e) => updateStatus(enquiry._id, e.target.value)}
                            className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="new">New</option>
                            <option value="read">Read</option>
                            <option value="replied">Replied</option>
                          </select>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleView(enquiry)}
                            className="p-2 text-gray-600 hover:bg-gray-50 rounded"
                            title="View"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => openEmailModal(enquiry)}
                            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded"
                            title="Send Mail"
                          >
                            <Send size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(enquiry._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </>
      )}

      {/* Email Modal */}
      {showEmailModal && selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-teal-50">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Mail className="w-5 h-5 text-emerald-600" />
                Send Reply to {selectedEnquiry.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{selectedEnquiry.email}</p>
            </div>

            <form onSubmit={handleSendEmail} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={emailData.subject}
                  onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={emailData.message}
                  onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
                  required
                  rows={10}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEmailModal(false)
                    setSelectedEnquiry(null)
                    setEmailData({ subject: '', message: '' })
                  }}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sendingEmail === selectedEnquiry._id}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  {sendingEmail === selectedEnquiry._id ? 'Sending...' : 'Send Email'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetail && selectedEnquiryDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Enquiry Details</h3>
                <p className="text-sm text-gray-500">{new Date(selectedEnquiryDetail.createdAt).toLocaleString()}</p>
              </div>
              <button
                onClick={() => {
                  setShowDetail(false)
                  setSelectedEnquiryDetail(null)
                }}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-gray-500">Name</p>
                  <p className="font-medium text-gray-900">{selectedEnquiryDetail.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                    selectedEnquiryDetail.status === 'new' ? 'bg-blue-100 text-blue-800' :
                    selectedEnquiryDetail.status === 'read' ? 'bg-gray-100 text-gray-800' :
                    'bg-teal-100 text-teal-800'
                  }`}>
                    {selectedEnquiryDetail.status}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-gray-700">{selectedEnquiryDetail.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-gray-700">{selectedEnquiryDetail.phone}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-gray-500">Subject</p>
                  <p className="text-gray-700">{selectedEnquiryDetail.subject}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-gray-500">Message</p>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedEnquiryDetail.message}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
