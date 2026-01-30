'use client'

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard,
  Calendar,
  Stethoscope,
  Briefcase,
  Package,
  FileText,
  MessageSquare,
  Mail,
  LogOut,
  Menu,
  X,
} from 'lucide-react'

export default function AuthAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return null
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: Calendar, label: 'Appointments', href: '/admin/appointments' },
    { icon: Stethoscope, label: 'Treatments', href: '/admin/treatments' },
    { icon: Briefcase, label: 'Services', href: '/admin/services' },
    { icon: Package, label: 'Products', href: '/admin/products' },
    { icon: FileText, label: 'Blogs', href: '/admin/blogs' },
    { icon: MessageSquare, label: 'Testimonials', href: '/admin/testimonials' },
    { icon: Mail, label: 'Enquiries', href: '/admin/enquiries' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-30">
        <div className="px-3 sm:px-4">
          <div className="flex justify-between h-14 sm:h-16 items-center">
            <div className="flex items-center gap-2 sm:gap-4">
              {isMobile && (
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              )}
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Admin Panel</h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="text-xs sm:text-sm text-gray-600 hidden sm:inline">{session?.user?.name}</span>
              <button
                onClick={() => signOut({ callbackUrl: '/admin/login' })}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <LogOut size={14} className="sm:size-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-14 sm:pt-16">
        {/* Sidebar */}
        <aside
          className={`${
            isMobile ? 'fixed' : 'sticky'
          } top-14 sm:top-16 left-0 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] w-56 sm:w-64 bg-white border-r border-gray-200 transition-transform duration-300 z-20 ${
            isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'
          }`}
        >
          <nav className="p-3 sm:p-4 space-y-1 overflow-y-auto h-full">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => isMobile && setSidebarOpen(false)}
                  className={`flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon size={18} className="sm:size-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-10"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-3 sm:p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
