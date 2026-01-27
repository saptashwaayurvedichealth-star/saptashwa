const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb+srv://saptashwaayurvedichealth_db_user:N5JmtX5PMLaqOUTw@cluster0.zsfcj0b.mongodb.net/medical_appointment?retryWrites=true&w=majority';

const AdminSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  role: String,
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

async function verifyAtlasAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas\n');

    const admins = await Admin.find({});
    console.log('📋 Total admins:', admins.length);

    if (admins.length === 0) {
      console.log('❌ No admin found! Running seed...\n');
      
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const admin = await Admin.create({
        email: 'admin@medical.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'admin',
      });
      console.log('✅ Admin created:', admin.email);
    } else {
      console.log('\n👥 Admin users:');
      for (const admin of admins) {
        console.log(`  - Email: ${admin.email}`);
        console.log(`    Name: ${admin.name}`);
        console.log(`    Has Password: ${!!admin.password}`);
        console.log(`    Password Length: ${admin.password?.length}`);
        
        // Test password
        const isValid = await bcrypt.compare('admin123', admin.password);
        console.log(`    ✓ Password 'admin123' works: ${isValid ? '✅ YES' : '❌ NO'}`);
        console.log('');
      }
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

verifyAtlasAdmin();
