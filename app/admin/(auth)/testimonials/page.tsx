'use client'

import { useEffect, useState } from 'react'
import { Plus, Edit2, Trash2, X, Eye, EyeOff, Star } from 'lucide-react'
import CloudinaryUpload from '@/components/cloudinary-upload'

interface Testimonial {
  _id: string
  patientName: string
  description: string
  rating: number
  image?: string
  youtubeUrl?: string
  treatment: string
  isActive: boolean
  isFeatured: boolean
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showDetail, setShowDetail] = useState(false)
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null)
  const [formData, setFormData] = useState({
    patientName: '',
    description: '',
    rating: '5',
    image: '',
    youtubeUrl: '',
    treatment: '',
    isActive: true,
    isFeatured: false,
  })

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials')
      const data = await res.json()
      setTestimonials(data.testimonials || [])
    } catch (error) {
      console.error('Failed to fetch testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      patientName: '',
      description: '',
      rating: '5',
      image: '',
      youtubeUrl: '',
      treatment: '',
      isActive: true,
      isFeatured: false,
    })
    setEditingId(null)
    setShowForm(false)
  }

  const handleEdit = (testimonial: Testimonial) => {
    setFormData({
      patientName: testimonial.patientName,
      description: testimonial.description,
      rating: testimonial.rating.toString(),
      image: testimonial.image || '',
      youtubeUrl: testimonial.youtubeUrl || '',
      treatment: testimonial.treatment,
      isActive: testimonial.isActive,
      isFeatured: testimonial.isFeatured,
    })
    setEditingId(testimonial._id)
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editingId ? `/api/testimonials/${editingId}` : '/api/testimonials'
      const method = editingId ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          rating: parseInt(formData.rating),
        }),
      })

      if (res.ok) {
        fetchTestimonials()
        resetForm()
      }
    } catch (error) {
      console.error('Failed to save testimonial:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return

    try {
      await fetch(`/api/testimonials/${id}`, { method: 'DELETE' })
      fetchTestimonials()
    } catch (error) {
      console.error('Failed to delete testimonial:', error)
    }
  }

  const handleView = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial)
    setShowDetail(true)
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
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Testimonials</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage patient testimonials</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={18} className="sm:w-5 sm:h-5" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-xl font-semibold">{editingId ? 'Edit' : 'Add'} Testimonial</h2>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Patient Image (Optional)</label>
                <CloudinaryUpload
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  folder="testimonials"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                <input
                  type="text"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={5}
                  placeholder="Patient's feedback or review..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Treatment</label>
                  <input
                    type="text"
                    value={formData.treatment}
                    onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                    required
                    placeholder="e.g., Root Canal"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL (Optional)</label>
                <input
                  type="url"
                  value={formData.youtubeUrl}
                  onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">Video testimonials have more impact!</p>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isActive" className="text-sm text-gray-700">Active</label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isFeatured" className="text-sm text-gray-700">Featured</label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingId ? 'Update' : 'Create'} Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {testimonials.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-600">No testimonials found. Add your first testimonial!</p>
        </div>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="block md:hidden divide-y divide-gray-200 bg-white rounded-lg border border-gray-200">
            {testimonials.map((testimonial) => (
              <div key={testimonial._id} className="p-4 hover:bg-gray-50">
                <div className="flex gap-3 mb-3">
                  {testimonial.image ? (
                    <img
                      src={testimonial.image}
                      alt={testimonial.patientName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-lg">
                      {testimonial.patientName.charAt(0)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{testimonial.patientName}</p>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded">{testimonial.treatment}</span>
                    {testimonial.youtubeUrl && (
                      <span className="px-2 py-1 bg-red-50 text-red-600 rounded">📹 Video</span>
                    )}
                  </div>
                  
                  <div className="text-gray-700 text-sm">
                    <p className="line-clamp-3">{testimonial.description}</p>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {testimonial.isActive ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded inline-flex items-center gap-1">
                        <Eye size={12} /> Active
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded inline-flex items-center gap-1">
                        <EyeOff size={12} /> Inactive
                      </span>
                    )}
                    {testimonial.isFeatured && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded inline-flex items-center gap-1">
                        ★ Featured
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => handleView(testimonial)}
                    className="flex-1 px-3 py-2 text-xs text-gray-700 border border-gray-300 rounded hover:bg-gray-50 flex items-center justify-center gap-1"
                  >
                    <Eye size={14} /> View
                  </button>
                  <button
                    onClick={() => handleEdit(testimonial)}
                    className="flex-1 px-3 py-2 text-xs text-blue-600 border border-blue-300 rounded hover:bg-blue-50 flex items-center justify-center gap-1"
                  >
                    <Edit2 size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial._id)}
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Treatment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Video</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {testimonials.map((testimonial) => (
                    <tr key={testimonial._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          {testimonial.image ? (
                            <img
                              src={testimonial.image}
                              alt={testimonial.patientName}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                              {testimonial.patientName.charAt(0)}
                            </div>
                          )}
                          <span className="text-sm font-medium text-gray-900">{testimonial.patientName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded">{testimonial.treatment}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 line-clamp-2 max-w-xs">{testimonial.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {testimonial.youtubeUrl ? (
                          <span className="px-2 py-1 text-xs bg-red-50 text-red-600 rounded">📹</span>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1">
                          {testimonial.isActive ? (
                            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded flex items-center gap-1 w-fit">
                              <Eye size={12} /> Active
                            </span>
                          ) : (
                            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded flex items-center gap-1 w-fit">
                              <EyeOff size={12} /> Inactive
                            </span>
                          )}
                          {testimonial.isFeatured && (
                            <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded flex items-center gap-1 w-fit">
                              <Star size={12} /> Featured
                            </span>
                          )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleView(testimonial)}
                          className="p-2 text-gray-600 hover:bg-gray-50 rounded"
                          title="View"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleEdit(testimonial)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(testimonial._id)}
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

      {showDetail && selectedTestimonial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Testimonial Details</h3>
              </div>
              <button
                onClick={() => {
                  setShowDetail(false)
                  setSelectedTestimonial(null)
                }}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                {selectedTestimonial.image ? (
                  <img src={selectedTestimonial.image} alt={selectedTestimonial.patientName} className="w-20 h-20 rounded-full object-cover" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-2xl">
                    {selectedTestimonial.patientName.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-900 text-lg">{selectedTestimonial.patientName}</p>
                  <div className="flex gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < selectedTestimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-gray-500">Treatment</p>
                  <p className="text-gray-700">{selectedTestimonial.treatment}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <p className="text-gray-700">{selectedTestimonial.isActive ? 'Active' : 'Inactive'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Featured</p>
                  <p className="text-gray-700">{selectedTestimonial.isFeatured ? 'Yes' : 'No'}</p>
                </div>
                {selectedTestimonial.youtubeUrl && (
                  <div>
                    <p className="text-xs text-gray-500">Video</p>
                    <a href={selectedTestimonial.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">Watch on YouTube</a>
                  </div>
                )}
                <div className="col-span-2">
                  <p className="text-xs text-gray-500">Review</p>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedTestimonial.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
