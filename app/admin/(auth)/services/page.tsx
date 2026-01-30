'use client'

import { useEffect, useState } from 'react'
import { Plus, Edit2, Trash2, X, Eye, EyeOff } from 'lucide-react'
import CloudinaryUpload from '@/components/cloudinary-upload'

interface Service {
  _id: string
  title: string
  description: string
  image: string
  features: string[]
  isActive: boolean
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showDetail, setShowDetail] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    features: [''],
    isActive: true,
  })

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services')
      const data = await res.json()
      setServices(data.services || [])
    } catch (error) {
      console.error('Failed to fetch services:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      features: [''],
      isActive: true,
    })
    setEditingId(null)
    setShowForm(false)
  }

  const handleEdit = (service: Service) => {
    setFormData({
      title: service.title,
      description: service.description,
      image: service.image,
      features: service.features.length > 0 ? service.features : [''],
      isActive: service.isActive,
    })
    setEditingId(service._id)
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.title.trim()) {
      alert('Please enter a title')
      return
    }
    if (!formData.description.trim()) {
      alert('Please enter a description')
      return
    }
    if (!formData.image) {
      alert('Please upload an image')
      return
    }

    try {
      const url = editingId ? `/api/services/${editingId}` : '/api/services'
      const method = editingId ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          features: formData.features.filter(f => f.trim() !== ''),
        }),
      })

      if (res.ok) {
        fetchServices()
        resetForm()
      } else {
        const error = await res.json()
        alert(`Failed to save service: ${error.details || error.error}`)
      }
    } catch (error) {
      console.error('Failed to save service:', error)
      alert('Failed to save service. Please try again.')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return

    try {
      await fetch(`/api/services/${id}`, { method: 'DELETE' })
      fetchServices()
    } catch (error) {
      console.error('Failed to delete service:', error)
    }
  }

  const handleView = (service: Service) => {
    setSelectedService(service)
    setShowDetail(true)
  }

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] })
  }

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index)
    setFormData({ ...formData, features: newFeatures.length > 0 ? newFeatures : [''] })
  }

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData({ ...formData, features: newFeatures })
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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Services</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage medical services</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={18} className="sm:w-5 sm:h-5" />
          <span>Add Service</span>
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-xl font-semibold">{editingId ? 'Edit' : 'Add'} Service</h2>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                <CloudinaryUpload
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Features</label>
                  <button
                    type="button"
                    onClick={addFeature}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    + Add Feature
                  </button>
                </div>
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      placeholder="Enter feature"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formData.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="px-3 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

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
                  {editingId ? 'Update' : 'Create'} Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {services.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-600">No services found. Add your first service!</p>
        </div>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="block md:hidden divide-y divide-gray-200 bg-white rounded-lg border border-gray-200">
            {services.map((service) => (
              <div key={service._id} className="p-4 hover:bg-gray-50">
                <div className="flex gap-3 mb-3">
                  <img src={service.image} alt={service.title} className="h-16 w-16 rounded object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{service.title}</p>
                    <p className="text-xs text-gray-500 line-clamp-2 mt-1">{service.description}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{service.features.length} features</span>
                  </div>

                  <div>
                    {service.isActive ? (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded inline-flex items-center gap-1">
                        <Eye size={12} /> Active
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded inline-flex items-center gap-1">
                        <EyeOff size={12} /> Inactive
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => handleView(service)}
                    className="flex-1 px-3 py-2 text-xs text-gray-700 border border-gray-300 rounded hover:bg-gray-50 flex items-center justify-center gap-1"
                  >
                    <Eye size={14} /> View
                  </button>
                  <button
                    onClick={() => handleEdit(service)}
                    className="flex-1 px-3 py-2 text-xs text-blue-600 border border-blue-300 rounded hover:bg-blue-50 flex items-center justify-center gap-1"
                  >
                    <Edit2 size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Features</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {services.map((service) => (
                    <tr key={service._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img src={service.image} alt={service.title} className="h-12 w-12 rounded object-cover" />
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{service.title}</div>
                          <div className="text-sm text-gray-500 line-clamp-1">{service.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">{service.features.length} features</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {service.isActive ? (
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded flex items-center gap-1 w-fit">
                            <Eye size={12} /> Active
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded flex items-center gap-1 w-fit">
                            <EyeOff size={12} /> Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleView(service)}
                            className="p-2 text-gray-600 hover:bg-gray-50 rounded"
                            title="View"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleEdit(service)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(service._id)}
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

      {showDetail && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Service Details</h3>
              </div>
              <button
                onClick={() => {
                  setShowDetail(false)
                  setSelectedService(null)
                }}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {selectedService.image && (
                <img src={selectedService.image} alt={selectedService.title} className="w-full h-48 object-cover rounded-lg" />
              )}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="col-span-2">
                  <p className="text-xs text-gray-500">Title</p>
                  <p className="font-medium text-gray-900">{selectedService.title}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-gray-500">Status</p>
                  <p className="text-gray-700">{selectedService.isActive ? 'Active' : 'Inactive'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-gray-500 mb-2">Features</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {selectedService.features.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-gray-500">Description</p>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedService.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
