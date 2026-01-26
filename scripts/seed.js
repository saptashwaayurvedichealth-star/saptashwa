const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/medical_appointment';

// Schema definitions (simplified for seeding)
const AdminSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  role: String,
});

const TreatmentSchema = new mongoose.Schema({
  title: String,
  description: String,
  shortDescription: String,
  image: String,
  price: Number,
  duration: String,
  category: String,
  isActive: Boolean,
});

const ServiceSchema = new mongoose.Schema({
  title: String,
  description: String,
  icon: String,
  image: String,
  features: [String],
  isActive: Boolean,
  order: Number,
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
const Treatment = mongoose.models.Treatment || mongoose.model('Treatment', TreatmentSchema);
const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Admin.deleteMany({});
    await Treatment.deleteMany({});
    await Service.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await Admin.create({
      email: 'admin@medical.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin',
    });
    console.log('👤 Created admin user:', admin.email);

    // Create sample treatments
    const treatments = await Treatment.insertMany([
      {
        title: 'General Consultation',
        description: 'Comprehensive health assessment and consultation with experienced doctors.',
        shortDescription: 'Complete health checkup and consultation',
        image: 'treatment-general.jpg',
        price: 100,
        duration: '30-45 mins',
        category: 'General Medicine',
        isActive: true,
      },
      {
        title: 'Dental Care',
        description: 'Professional dental examination, cleaning, and treatment services.',
        shortDescription: 'Complete dental care solutions',
        image: 'treatment-dental.jpg',
        price: 150,
        duration: '45-60 mins',
        category: 'Dentistry',
        isActive: true,
      },
      {
        title: 'Cardiology Check',
        description: 'Heart health assessment including ECG and consultation.',
        shortDescription: 'Comprehensive cardiac evaluation',
        image: 'treatment-cardio.jpg',
        price: 200,
        duration: '60 mins',
        category: 'Cardiology',
        isActive: true,
      },
    ]);
    console.log(`💉 Created ${treatments.length} treatments`);

    // Create sample services
    const services = await Service.insertMany([
      {
        title: 'Emergency Care',
        description: '24/7 emergency medical services with rapid response team',
        icon: 'Heart',
        image: 'service-emergency.jpg',
        features: ['24/7 Availability', 'Rapid Response', 'Advanced Equipment'],
        isActive: true,
        order: 1,
      },
      {
        title: 'Diagnostic Services',
        description: 'State-of-the-art diagnostic and imaging facilities',
        icon: 'Activity',
        image: 'service-diagnostic.jpg',
        features: ['X-Ray', 'MRI', 'CT Scan', 'Blood Tests'],
        isActive: true,
        order: 2,
      },
      {
        title: 'Specialist Consultation',
        description: 'Expert consultation from certified medical specialists',
        icon: 'Stethoscope',
        image: 'service-specialist.jpg',
        features: ['Multiple Specialties', 'Experienced Doctors', 'Personalized Care'],
        isActive: true,
        order: 3,
      },
    ]);
    console.log(`🏥 Created ${services.length} services`);

    console.log('✅ Database seeded successfully!');
    console.log('\n📝 Login Credentials:');
    console.log('Email: admin@medical.com');
    console.log('Password: admin123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
