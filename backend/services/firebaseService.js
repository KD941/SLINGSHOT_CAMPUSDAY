const admin = require('firebase-admin');

let db = null;

/**
 * Initialize Firebase Admin SDK using Application Default Credentials
 * (service account key) or just the project ID for development.
 * For prod, set GOOGLE_APPLICATION_CREDENTIALS env var.
 */
function initFirebase() {
  if (admin.apps.length > 0) return; // already initialized

  // In dev, we'll use just the project ID (Firestore emulator or ADC)
  // In prod, set GOOGLE_APPLICATION_CREDENTIALS to the service-account.json path
  const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

  if (serviceAccountPath) {
    const serviceAccount = require(serviceAccountPath);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
  } else {
    // Use Application Default Credentials (works with Firebase CLI login)
    admin.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
  }

  db = admin.firestore();
  console.log(`[Firebase] Initialized for project: ${process.env.FIREBASE_PROJECT_ID}`);
}

/**
 * Seed the required Firestore collections with example documents
 * so the UI has data to display. Only runs if collections are empty.
 */
async function seedCollections() {
  const MOCK_USER_ID = 'user_123';
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  // 1. users collection
  const userRef = db.collection('users').doc(MOCK_USER_ID);
  const userSnap = await userRef.get();
  if (!userSnap.exists) {
    await userRef.set({
      name: 'Karmdeep',
      email: 'karmdeep@example.com',
      dateOfBirth: admin.firestore.Timestamp.fromDate(new Date('1998-01-01')),
      baseHealthMetrics: { weight: 69, height: 175, dietaryRestrictions: 'None' },
      preferences: {
        exerciseIntervalHours: 8,
        fastingRoutine: '16:8',
      },
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log('[Firestore] Created: users/user_123');
  }

  // 2. events collection
  const eventsSnap = await db.collection('events').where('userId', '==', MOCK_USER_ID).limit(1).get();
  if (eventsSnap.empty) {
    const events = [
      { userId: MOCK_USER_ID, title: 'Marathon', date: admin.firestore.Timestamp.fromDate(new Date('2026-04-03')), eventType: 'endurance', description: 'City marathon 42km' },
      { userId: MOCK_USER_ID, title: 'Yoga Day', date: admin.firestore.Timestamp.fromDate(new Date('2026-04-05')), eventType: 'wellness', description: 'Group yoga session' },
      { userId: MOCK_USER_ID, title: 'Wedding', date: admin.firestore.Timestamp.fromDate(new Date('2026-04-28')), eventType: 'milestone', description: 'Family wedding' },
    ];
    for (const event of events) {
      await db.collection('events').add(event);
    }
    console.log('[Firestore] Created: events (3 documents)');
  }

  // 3. daily_logs collection
  const logId = `${MOCK_USER_ID}_${today.replace(/-/g, '_')}`;
  const logRef = db.collection('daily_logs').doc(logId);
  const logSnap = await logRef.get();
  if (!logSnap.exists) {
    await logRef.set({
      userId: MOCK_USER_ID,
      date: today,
      foodOfTheDay: {
        mealName: 'Marathon Pasta Bowl',
        reasoning: 'High-carb to fuel your upcoming marathon.',
        calories: 600,
        macronutrients: { carbs: '80g', protein: '20g', fat: '10g' },
      },
      fasting: { isActive: true, durationLogged: 12 },
      exercisesTriggered: [
        { exerciseName: 'Desk Stretches', timeAssigned: admin.firestore.Timestamp.now(), completed: false },
      ],
      healthCheckMetrics: { weight: 69, waterIntakeLiters: 2.1, steps: 4500 },
    });
    console.log(`[Firestore] Created: daily_logs/${logId}`);
  }

  // 4. health_analysis collection
  const analysisSnap = await db.collection('health_analysis').where('userId', '==', MOCK_USER_ID).limit(1).get();
  if (analysisSnap.empty) {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    await db.collection('health_analysis').add({
      userId: MOCK_USER_ID,
      weekStartDate: admin.firestore.Timestamp.fromDate(weekStart),
      weekEndDate: admin.firestore.Timestamp.fromDate(weekEnd),
      aiSummary: 'You are maintaining a great streak. Your fasting adherence is excellent. Keep preparing for your upcoming marathon!',
      trendScore: 8,
      recommendationForNextWeek: 'Increase water intake and focus on recovery meals high in antioxidants.',
    });
    console.log('[Firestore] Created: health_analysis (1 document)');
  }

  console.log('[Firestore] Collection check complete.');
}

function getDb() {
  if (!db) throw new Error('Firebase not initialized. Call initFirebase() first.');
  return db;
}

module.exports = { initFirebase, seedCollections, getDb };
