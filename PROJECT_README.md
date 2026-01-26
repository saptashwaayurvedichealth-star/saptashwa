# Medical Appointment One-Pager Website

A comprehensive medical appointment booking website with an admin panel built with Next.js 16, MongoDB, and TypeScript.

## Features

### Frontend
- **Home**: Hero section with call-to-action
- **About**: Information about the medical practice
- **Treatments**: Display available medical treatments with prices and durations
- **Services**: Medical services offered
- **Products**: Medical and wellness products showcase
- **Blogs**: Health tips and medical articles
- **Testimonials**: Patient reviews with optional YouTube video testimonials
- **Appointment Booking**: Easy-to-use appointment scheduling system
- **Enquiry Form**: Contact form for general inquiries

### Admin Panel
- Secure authentication using NextAuth.js
- Dashboard with statistics overview
- Full CRUD operations for:
  - Appointments (Create, Read, Update, Delete)
  - Treatments
  - Services
  - Products
  - Blogs (with draft/published workflow)
  - Testimonials
  - Enquiries
- Search and filter functionality
- Responsive design

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js with credentials provider
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **TypeScript**: For type safety

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd medical care    ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # MongoDB Connection
   MONGODB_URI=mongodb://localhost:27017/medical_appointment
   # or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/medical_appointment

   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production

   # Admin Credentials (Initial setup)
   ADMIN_EMAIL=admin@medical.com
   ADMIN_PASSWORD=admin123
   ```

4. **Seed the database** (optional but recommended)
   ```bash
   pnpm seed
   ```
   This will create:
   - Admin user (admin@medical.com / admin123)
   - Sample treatments
   - Sample services

5. **Run the development server**
   ```bash
   pnpm dev
   ```

6. **Open your browser**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Admin Login: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## Default Admin Credentials

```
Email: admin@medical.com
Password: admin123
```

**⚠️ Important: Change these credentials in production!**

## MongoDB Setup

### Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service
3. Database will be created automatically when you run the seed script

### MongoDB Atlas (Cloud)
1. Create a free account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env.local`

## Project Structure

```
Sapthashwa/
├── app/
│   ├── admin/              # Admin panel pages
│   │   ├── dashboard/      # Dashboard overview
│   │   ├── login/          # Admin login page
│   │   └── layout.tsx      # Admin layout with sidebar
│   ├── api/                # API routes
│   │   ├── appointments/   # Appointment CRUD
│   │   ├── treatments/     # Treatment CRUD
│   │   ├── services/       # Service CRUD
│   │   ├── products/       # Product CRUD
│   │   ├── blogs/          # Blog CRUD
│   │   ├── testimonials/   # Testimonial CRUD
│   │   ├── enquiry/        # Enquiry CRUD
│   │   └── auth/           # NextAuth configuration
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── components/             # React components
│   ├── ui/                 # UI components (Radix UI)
│   ├── about.tsx
│   ├── appointment-booking.tsx
│   ├── blogs.tsx
│   ├── enquiry.tsx
│   ├── hero.tsx
│   ├── navigation.tsx
│   ├── products.tsx
│   ├── services.tsx
│   ├── testimonials.tsx
│   └── treatments.tsx
├── lib/
│   ├── mongodb.ts          # MongoDB connection utility
│   └── utils.ts            # Utility functions
├── models/                 # Mongoose schemas
│   ├── Admin.ts
│   ├── Appointment.ts
│   ├── Blog.ts
│   ├── Enquiry.ts
│   ├── Product.ts
│   ├── Service.ts
│   ├── Testimonial.ts
│   └── Treatment.ts
├── scripts/
│   └── seed.js             # Database seeding script
└── hooks/
    └── use-toast.ts        # Toast notification hook
```

## API Endpoints

### Appointments
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create new appointment
- `GET /api/appointments/[id]` - Get single appointment
- `PUT /api/appointments/[id]` - Update appointment
- `DELETE /api/appointments/[id]` - Delete appointment

### Treatments
- `GET /api/treatments` - Get all treatments
- `POST /api/treatments` - Create new treatment
- `GET /api/treatments/[id]` - Get single treatment
- `PUT /api/treatments/[id]` - Update treatment
- `DELETE /api/treatments/[id]` - Delete treatment

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Create new service
- `GET /api/services/[id]` - Get single service
- `PUT /api/services/[id]` - Update service
- `DELETE /api/services/[id]` - Delete service

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `GET /api/products/[id]` - Get single product
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

### Blogs
- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create new blog
- `GET /api/blogs/[id]` - Get single blog
- `PUT /api/blogs/[id]` - Update blog
- `DELETE /api/blogs/[id]` - Delete blog

### Testimonials
- `GET /api/testimonials` - Get all testimonials
- `POST /api/testimonials` - Create new testimonial
- `GET /api/testimonials/[id]` - Get single testimonial
- `PUT /api/testimonials/[id]` - Update testimonial
- `DELETE /api/testimonials/[id]` - Delete testimonial

### Enquiries
- `GET /api/enquiry` - Get all enquiries
- `POST /api/enquiry` - Create new enquiry
- `GET /api/enquiry/[id]` - Get single enquiry
- `PUT /api/enquiry/[id]` - Update enquiry
- `DELETE /api/enquiry/[id]` - Delete enquiry

## Features Implemented

✅ Responsive design for all screen sizes
✅ MongoDB database with Mongoose
✅ Complete CRUD operations for all modules
✅ Secure admin authentication
✅ Search and filter functionality in API routes
✅ Toast notifications for user feedback
✅ Form validation
✅ Blog workflow (draft/published)
✅ YouTube video integration for testimonials
✅ Dynamic content management

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms
Configure environment variables and deploy as a Node.js application.

## Security Notes

- Change default admin credentials immediately
- Use strong `NEXTAUTH_SECRET` in production
- Enable MongoDB authentication
- Use environment variables for sensitive data
- Implement rate limiting for API routes
- Add CORS policies as needed

## Future Enhancements

- [ ] File upload for images
- [ ] Email notifications
- [ ] Payment integration
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Appointment reminders
- [ ] Doctor profiles management
- [ ] Patient portal

## Support

For issues or questions, please create an issue in the repository.

## License

MIT
