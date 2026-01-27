const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Use Atlas connection string (matching Vercel)
const MONGODB_URI = 'mongodb+srv://saptashwaayurvedichealth_db_user:N5JmtX5PMLaqOUTw@cluster0.zsfcj0b.mongodb.net/?appName=Cluster0';

const AdminSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  role: String,
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

async function seedAtlas() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');

    // Clear existing admin
    await Admin.deleteMany({});
    console.log('🗑️  Cleared existing admin data');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin@123', 10);
    const admin = await Admin.create({
      email: 'admin@medical.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin',
    });
    console.log('👤 Created admin user:', admin.email);

    console.log('✅ Atlas database seeded successfully!');
    console.log('\n📝 Login Credentials:');
    console.log('Email: admin@medical.com');
    console.log('Password: admin123');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding Atlas:', error);
    process.exit(1);
  }
}

seedAtlas();
