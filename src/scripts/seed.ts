import { connectDB, disconnectDB } from '../config/db';
import { User } from '../models/User';
import { Class } from '../models/Class';
import { DEMO_STUDENT, DEMO_INSTRUCTOR, DEMO_ADMIN } from '../utils/constants';

const SAMPLE_CLASSES = [
  {
    title: 'Salsa Night Beginners',
    shortDescription: 'Learn the basics of Salsa in a fun, supportive environment.',
    fullDescription: 'Join Maria for an exciting beginner Salsa class! You\'ll learn basic steps, timing, and partner work. No experience needed—just bring your energy and comfortable shoes.',
    instructor: 'Maria Rodriguez',
    style: 'Salsa',
    level: 'Beginner',
    price: 25,
    date: 'Every Saturday',
    time: '6:00 PM - 7:30 PM',
    location: 'Downtown Dance Studio, NYC',
    imageUrl: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?w=400&h=300&fit=crop',
    rating: 4.8,
    reviewCount: 24,
  },
  {
    title: 'Ballet for Adults',
    shortDescription: 'Graceful ballet technique for beginners and returning dancers.',
    fullDescription: 'Rediscover the beauty of ballet in a welcoming adult class. We focus on proper alignment, flexibility, and musicality.',
    instructor: 'Elena Volkova',
    style: 'Ballet',
    level: 'Beginner',
    price: 30,
    date: 'Every Tuesday & Thursday',
    time: '7:00 PM - 8:30 PM',
    location: 'Ballet Arts Center, Brooklyn',
    imageUrl: 'https://images.unsplash.com/photo-1545529468-42764ef8c85f?w=400&h=300&fit=crop',
    rating: 4.9,
    reviewCount: 18,
  },
  {
    title: 'High-Energy Hip-Hop',
    shortDescription: 'Urban dance moves with a modern twist. Come ready to sweat!',
    fullDescription: 'This high-energy Hip-Hop class will teach you the latest urban dance styles. We\'ll break down choreography from popular music videos.',
    instructor: 'Jay Thompson',
    style: 'Hip-Hop',
    level: 'Intermediate',
    price: 20,
    date: 'Every Wednesday & Friday',
    time: '8:00 PM - 9:30 PM',
    location: 'The Hive Studio, Manhattan',
    imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop',
    rating: 4.7,
    reviewCount: 31,
  },
  {
    title: 'Zumba Fitness Party',
    shortDescription: 'Dance your way to fitness with Latin-inspired moves.',
    fullDescription: 'Zumba is a fun, high-energy workout that combines Latin and international music with dance moves. It\'s a full-body workout that feels like a party!',
    instructor: 'Carlos Mendez',
    style: 'Zumba',
    level: 'All Levels',
    price: 15,
    date: 'Every Monday, Wednesday, Friday',
    time: '6:30 AM - 7:30 AM',
    location: 'FitHub Gym, Queens',
    imageUrl: 'https://images.unsplash.com/photo-1594035910383-cf091e981ede?w=400&h=300&fit=crop',
    rating: 4.6,
    reviewCount: 42,
  },
  {
    title: 'Contemporary Dance Flow',
    shortDescription: 'Expressive movement combining modern dance and improvisation.',
    fullDescription: 'Explore the art of Contemporary dance in this expressive class. We combine modern dance techniques with improvisation and floor work.',
    instructor: 'Sarah Chen',
    style: 'Contemporary',
    level: 'Intermediate',
    price: 28,
    date: 'Every Tuesday & Thursday',
    time: '6:00 PM - 7:30 PM',
    location: 'The Dance Loft, Brooklyn',
    imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop',
    rating: 4.9,
    reviewCount: 15,
  },
  {
    title: 'Jazz Funk Grooves',
    shortDescription: 'High-energy jazz with funky, commercial dance vibes.',
    fullDescription: 'Get ready to groove with Jazz Funk! This class combines jazz technique with commercial dance styles.',
    instructor: 'Tiffany Rose',
    style: 'Jazz',
    level: 'All Levels',
    price: 22,
    date: 'Every Saturday',
    time: '2:00 PM - 3:30 PM',
    location: 'DanceWorks Studio, Manhattan',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop',
    rating: 4.5,
    reviewCount: 19,
  },
];

async function seedDatabase() {
  try {
    console.log('🌱 Seeding database...');

    // Clear existing data
    await User.deleteMany({});
    await Class.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create 3 demo users
    const studentUser = await User.create({
      name: DEMO_STUDENT.name,
      email: DEMO_STUDENT.email,
      password: DEMO_STUDENT.password,
      role: 'student',
    });

    const instructorUser = await User.create({
      name: DEMO_INSTRUCTOR.name,
      email: DEMO_INSTRUCTOR.email,
      password: DEMO_INSTRUCTOR.password,
      role: 'instructor',
    });

    const adminUser = await User.create({
      name: DEMO_ADMIN.name,
      email: DEMO_ADMIN.email,
      password: DEMO_ADMIN.password,
      role: 'admin',
    });

    console.log(`👤 Created student: ${studentUser.email}`);
    console.log(`👤 Created instructor: ${instructorUser.email}`);
    console.log(`👤 Created admin: ${adminUser.email}`);

    // Create classes (assigned to instructor)
    const classesWithUser = SAMPLE_CLASSES.map((cls) => ({
      ...cls,
      createdBy: instructorUser._id,
    }));

    await Class.insertMany(classesWithUser);
    console.log(`📚 Created ${classesWithUser.length} dance classes`);

    console.log('✅ Database seeded successfully!');
    console.log('\n📝 Login Credentials:');
    console.log(`  🎓 Student: ${DEMO_STUDENT.email} / ${DEMO_STUDENT.password}`);
    console.log(`  🧑‍🏫 Instructor: ${DEMO_INSTRUCTOR.email} / ${DEMO_INSTRUCTOR.password}`);
    console.log(`  👑 Admin: ${DEMO_ADMIN.email} / ${DEMO_ADMIN.password}`);

    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    await disconnectDB();
    process.exit(1);
  }
}

// Run seed
connectDB().then(seedDatabase);