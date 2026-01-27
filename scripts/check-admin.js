const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/medical_appointment';

async function checkAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB:', MONGODB_URI);

    const AdminSchema = new mongoose.Schema({
      email: String,
      password: String,
      name: String,
      role: String,
    });

    const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

    const admins = await Admin.find({});
    console.log('\n📋 Total admins in database:', admins.length);
    
    if (admins.length > 0) {
      console.log('\n👥 Admin users:');
      admins.forEach(admin => {
        console.log(`  - Email: ${admin.email}`);
        console.log(`    Name: ${admin.name}`);
        console.log(`    Role: ${admin.role}`);
        console.log(`    Has Password: ${!!admin.password}`);
        console.log(`    Password Hash Length: ${admin.password?.length || 0}`);
        console.log('');
      });
    } else {
      console.log('\n❌ No admin users found in database');
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkAdmin();
