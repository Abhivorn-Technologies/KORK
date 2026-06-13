import { NextResponse } from 'next/server';
import { initializeApp, getApps, getApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import nodemailer from 'nodemailer';

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
    const { name, email, projectName } = await request.json();

    if (!name || !email || !projectName) {
      return NextResponse.json({ error: 'Name, email, and projectName are required.' }, { status: 400 });
    }

    const { auth, db } = getFirebaseAdmin();

    // 1. Create client in Firebase Auth
    const tempPassword = Math.random().toString(36).slice(-10) + 'A1!'; // Secure temp password
    const userRecord = await auth.createUser({
      email,
      password: tempPassword,
      displayName: name,
    });

    // 2. Add client profile record to Firestore 'client_projects'
    await db.collection('client_projects').doc(userRecord.uid).set({
      clientId: userRecord.uid,
      name,
      email,
      needsPasswordChange: true,
      createdAt: new Date().toISOString(),
    });

    // 2b. Add initial project to the projects subcollection
    const projectRef = db.collection('client_projects').doc(userRecord.uid).collection('projects').doc();
    await projectRef.set({
      id: projectRef.id,
      projectName,
      phase: 'Initial Consultation',
      progress: 10,
      createdAt: new Date().toISOString(),
      deadline: 'TBD'
    });

    // 3. Define Portal Login Link
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const portalLoginLink = `${siteUrl}/client-portal`;

    // 4. Send Email Notification with onboarding info & login link
    const mailOptions = {
      from: `"${process.env.NEXT_PUBLIC_SITE_NAME || 'Kork Inventrex Support'}" <${process.env.EMAIL_USER || 'support@korkinventrex.com'}>`,
      to: email,
      subject: 'Welcome to KORK Inventrex: Setup Your Client Portal Account',
      html: `
        <div style="font-family: sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="color: #1e3a8a;">Welcome to KORK Inventrex Technologies</h2>
          <p>Dear <strong>${name}</strong>,</p>
          <p>Your secure intellectual property portal has been prepared successfully.</p>
          <p><strong>Associated Project:</strong> ${projectName}</p>
          <p>Please log in using the following temporary credentials to verify your account and set up your new secure password:</p>
          
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin: 20px 0;">
            <p style="margin: 0 0 8px 0;"><strong>Username / Email:</strong> <code>${email}</code></p>
            <p style="margin: 0;"><strong>Temporary Password:</strong> <code>${tempPassword}</code></p>
          </div>

          <p>Click the button below to go to the login page, where you will be prompted to change this temporary password after logging in:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${portalLoginLink}" style="padding: 12px 24px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Log In & Change Password</a>
          </div>
          <p style="color: #64748b; font-size: 12px;">If you cannot click the button, copy and paste this URL into your browser:</p>
          <p style="color: #3b82f6; font-size: 12px; word-break: break-all;">${portalLoginLink}</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="color: #94a3b8; font-size: 11px;">This is an automated security email. Please do not reply directly.</p>
        </div>
      `,
    };

    // 5. Send Email Notification using configured SMTP transport
    let emailSent = false;
    let emailError = '';

    try {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: process.env.EMAIL_PORT === '465',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail(mailOptions);
      emailSent = true;
    } catch (err: any) {
      console.error('SMTP sending error:', err);
      emailError = err.message || 'Failed to dispatch email';
    }

    return NextResponse.json({ 
      success: true,
      emailSent,
      emailError,
      tempPassword,
      passwordResetLink: portalLoginLink
    });
  } catch (error: any) {
    console.error('Error creating client account:', error);
    return NextResponse.json({ error: error.message || 'Failed to create client account.' }, { status: 500 });
  }
}
