import "server-only"
import { cert, getApps, initializeApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"

/**
 * Server-only Firestore handle (Firebase Admin SDK). Browsers never talk to Firestore:
 * `/api/quote` writes and `/api/admin/submissions` reads (after checking the admin cookie).
 * Returns null until the three FIREBASE_* env vars are set.
 */
export function getDb() {
  const projectId = process.env.FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  // .env files store the key with literal "\n"; PEM needs real newlines
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")
  if (!projectId || !clientEmail || !privateKey) return null

  const app = getApps()[0] ?? initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) })
  return getFirestore(app)
}

export const SUBMISSIONS = "submissions"
