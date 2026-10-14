# Firebase (Firestore) setup, step by step

How it works: the website form posts to `/api/quote`, the server saves it to Firestore with a **service account** (Firebase Admin SDK). The admin app signs in with our own login (`/api/admin/login`, env password) and reads through `/api/admin/submissions`. Browsers never talk to Firestore, so Firestore rules are set to **deny everything**; the Admin SDK bypasses rules.

## 1. Create the project (free Spark plan, no card)
1. Go to https://console.firebase.google.com and sign in with the Google account that should own the data (the client's, ideally).
2. **Create a project** (name: `ncr-grass`). Turn Google Analytics **off**. Create.
3. Left menu: **Build > Firestore Database > Create database**.
   - Edition: Standard. Location: **asia-south1 (Mumbai)** (cannot be changed later).
   - Start in **production mode**. Enable.
4. **Rules** tab: replace everything with the block below, then **Publish**.
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if false;
       }
     }
   }
   ```
   (The server still works: the Admin SDK ignores rules. Nobody can reach the data from a browser.)

## 2. Get the server key
1. Gear icon > **Project settings > Service accounts > Generate new private key** > confirm. A `.json` file downloads.
2. Open it. You need three values: `project_id`, `client_email`, `private_key`.
3. Treat this file like a password. Do not commit it, do not paste it in chat or email. Delete the download after copying.

## 3. Put them in env vars
Local (`.env.local`, git-ignored):
```
FIREBASE_PROJECT_ID="ncr-grass-xxxxx"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxxxx@ncr-grass-xxxxx.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"
```
Keep the key on **one line inside quotes** with the literal `\n` sequences exactly as in the JSON.

Production host (e.g. Vercel > Project > Settings > Environment Variables): add the same three, plus `ADMIN_PHONE`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, for the Production environment. **Redeploy** afterwards. Without the three FIREBASE_* values `/api/quote` returns 503 in production (the form shows its Call / WhatsApp fallback) instead of pretending a lead was saved.

## 4. Test
1. `npm run dev`, submit the home page form. In Firestore **Data** a `submissions` collection appears with the new document (`name, phone, area, size, createdAt`).
2. Open `/admin`, sign in. The enquiry shows with its number, date and time. The list refreshes every 30 s and when you return to the app.

## Notes
- Collection: `submissions`. Fields: `name`, `phone` (10 digits), `area`, `size` (optional), `createdAt` (server timestamp).
- The list loads the newest 500. Free-plan limits (20k writes, 50k reads per day) are far above a lead form; the admin polling costs about 1 read per enquiry per refresh.
- Deleting an enquiry for now: delete the document in the Firebase console.
- Push notifications (FCM) are a later step.


## Enquiry alerts
Phone notifications need two more env vars (`VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`): see `docs/push-setup.md`. They use a second Firestore collection, `pushSubscriptions`, which the same deny-all rules already protect.
