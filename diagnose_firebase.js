const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('===================================================');
console.log('   KORK FIREBASE CONNECTION DIAGNOSTIC TOOL       ');
console.log('===================================================\n');

// 1. Resolve workspace paths
const workspaceDir = __dirname;
const envPath = path.join(workspaceDir, '.env.local');

if (!fs.existsSync(envPath)) {
  console.error(`❌ Error: .env.local not found at path: ${envPath}`);
  process.exit(1);
}

console.log(`✓ Located .env.local file.`);

// 2. Parse .env.local file content
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

envContent.split(/\r?\n/).forEach((line) => {
  const trimmed = line.trim();
  // Skip comments and empty lines
  if (!trimmed || trimmed.startsWith('#')) return;

  const match = trimmed.match(/^([^=]+)=(.*)$/);
  if (match) {
    let key = match[1].trim();
    let val = match[2].trim();

    // Remove surrounding quotes if they exist
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.substring(1, val.length - 1);
    }
    envVars[key] = val;
  }
});

// Set environment variables for this process
Object.assign(process.env, envVars);

// 3. Checklist of Required Variables
const requiredVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_CLIENT_EMAIL',
  'FIREBASE_PRIVATE_KEY'
];

let envCheckPassed = true;
console.log('\n--- Checking Env Variables ---');
requiredVars.forEach((v) => {
  if (process.env[v]) {
    let preview = process.env[v];
    if (preview.length > 30) {
      preview = preview.substring(0, 15) + '...' + preview.substring(preview.length - 10);
    }
    console.log(`✓ ${v}: ${preview}`);
  } else {
    console.log(`❌ ${v} is missing!`);
    envCheckPassed = false;
  }
});

if (!envCheckPassed) {
  console.log('\n❌ Environment variables check failed! Correct the missing keys inside .env.local.');
  process.exit(1);
}
console.log('✓ Environment variables are populated.');

// 4. Validate Private Key Formatting
console.log('\n--- Validating Firebase Admin Private Key ---');
let rawKey = process.env.FIREBASE_PRIVATE_KEY;
let formattedKey = rawKey.replace(/\\n/g, '\n');

try {
  // Test loading via crypto module to check if it's a valid PEM
  crypto.createPrivateKey(formattedKey);
  console.log('✓ Private key format is VALID (Crypto module parsed it successfully).');
} catch (err) {
  console.error('❌ Private Key format is INVALID:');
  console.error(err.message);
  console.log('\nMake sure it starts with -----BEGIN PRIVATE KEY----- and ends with -----END PRIVATE KEY----- and newlines are escaped as \\n.');
  process.exit(1);
}

// 5. Connect via Firebase Admin SDK
console.log('\n--- Connecting to Firebase Services via Admin SDK ---');
try {
  const { initializeApp, cert } = require('firebase-admin/app');
  const { getAuth } = require('firebase-admin/auth');
  const { getFirestore } = require('firebase-admin/firestore');
  const { getStorage } = require('firebase-admin/storage');
  
  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: formattedKey,
  };

  const app = initializeApp({
    credential: cert(serviceAccount),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || `${process.env.FIREBASE_PROJECT_ID}.appspot.com`
  });

  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);

  async function testConnections() {
    // A. Test Auth Service
    try {
      const listUsersResult = await auth.listUsers(1);
      console.log(`✓ Firebase Authentication Connection: SUCCESS (Auth API connected correctly).`);
    } catch (authErr) {
      console.error(`❌ Firebase Authentication Connection failed:`, authErr.message);
    }

    // B. Test Firestore Service
    try {
      const snapshot = await db.collection('client_projects').limit(1).get();
      console.log(`✓ Firestore Database Connection: SUCCESS (Database API query worked correctly).`);
    } catch (dbErr) {
      console.error(`❌ Firestore Database Connection failed:`, dbErr.message);
    }

    // C. Test Storage Service
    try {
      const bucket = storage.bucket();
      const [exists] = await bucket.exists();
      if (exists) {
        console.log(`✓ Firebase Storage Connection: SUCCESS (Cloud Storage bucket exists and is accessible).`);
      } else {
        console.error(`❌ Firebase Storage Connection: Bucket does not exist or is inaccessible.`);
      }
    } catch (storageErr) {
      console.error(`❌ Firebase Storage Connection failed:`, storageErr.message);
    }

    console.log('\n===================================================');
    console.log('              DIAGNOSTIC COMPLETE                  ');
    console.log('===================================================');
  }

  testConnections();

} catch (err) {
  console.error('❌ Failed to initialize Firebase Admin SDK:', err.message);
}
