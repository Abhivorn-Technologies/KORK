import { NextResponse } from 'next/server';
import { initializeApp, getApps, getApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

export const dynamic = 'force-dynamic';

// Prepare service account credentials
const serviceAccount = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

const isAdminConfigured = !!(
  serviceAccount.projectId &&
  serviceAccount.clientEmail &&
  serviceAccount.privateKey &&
  !serviceAccount.privateKey.includes('...')
);

function getFirebaseAdmin() {
  if (!isAdminConfigured) {
    throw new Error('Firebase Admin SDK is not configured. Please supply a valid private key in .env.local.');
  }

  const app = getApps().length === 0 
    ? initializeApp({
        credential: cert(serviceAccount as any),
      })
    : getApp();

  const auth = getAuth(app);
  const db = getFirestore(app);

  return { auth, db };
}

export async function POST(request: Request) {
  try {
    const { clientId } = await request.json();

    if (!clientId) {
      return NextResponse.json({ error: 'clientId is required.' }, { status: 400 });
    }

    const { auth, db } = getFirebaseAdmin();

    // 1. Delete user from Firebase Authentication
    try {
      await auth.deleteUser(clientId);
    } catch (authErr: any) {
      // If user is already deleted from Auth, we still want to proceed with Firestore cleanup
      console.warn('Auth user deletion warning or not found:', authErr.message);
    }

    // 2. Delete all projects in the client's projects subcollection
    try {
      const projectsSnapshot = await db.collection('client_projects').doc(clientId).collection('projects').get();
      const batch = db.batch();
      projectsSnapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
    } catch (projectsErr: any) {
      console.warn('Projects cleanup warning:', projectsErr.message);
    }

    // 2b. Delete parent client document from Firestore client_projects
    await db.collection('client_projects').doc(clientId).delete();

    // 3. Optional: Delete associated documents registry and messages
    // To be clean, we can delete their documents metadata
    try {
      const documentsSnapshot = await db.collection('documents').where('clientId', '==', clientId).get();
      const batch = db.batch();
      documentsSnapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      
      const messagesSnapshot = await db.collection('messages').where('clientId', '==', clientId).get();
      messagesSnapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      
      await batch.commit();
    } catch (cleanupErr: any) {
      console.warn('Associated data cleanup warning:', cleanupErr.message);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting client account:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete client account.' }, { status: 500 });
  }
}
