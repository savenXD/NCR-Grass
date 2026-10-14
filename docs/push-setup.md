# Enquiry alerts (Web Push) setup

How it works: the owner installs the admin app and taps **Allow notifications** (the sheet opens by itself inside the installed app; the bell icon in the header reopens it any time). The browser gives us a push subscription, which `/api/admin/push` saves to Firestore (`pushSubscriptions`, one document per device). When `/api/quote` saves a new enquiry, `src/lib/push.ts` sends an encrypted notification ("New enquiry", "<name> · <area>") to every saved device, after the response so the visitor never waits. Free: standard Web Push + VAPID keys via the `web-push` library, no extra service or Firebase client SDK.

## 1. Create the keys (once)
```
npm run vapid
```
Copy the two lines it prints.

## 2. Add them as env vars (locally and on the host)
```
VAPID_PUBLIC_KEY="..."
VAPID_PRIVATE_KEY="..."
# optional: VAPID_SUBJECT="mailto:you@example.com"   (defaults to https://ncrgrass.in)
```
The private key is a secret (never commit it, never prefix with NEXT_PUBLIC_). If you ever change the pair, every device must open the app and allow alerts again.

## 3. Turn it on per device (the app's `/admin/install` page shows these install steps with iPhone / Android tabs)
- **Android / desktop Chrome, Edge:** install the app (or just open /admin), sign in, tap **Allow notifications**.
- **iPhone / iPad (iOS 16.4+):** Safari > Share > **Add to Home Screen**, open the app from the Home Screen icon, sign in, tap **Allow notifications**. iOS does not allow alerts from a normal Safari tab.
- Signing out stops alerts on that device (and signing in again restores them). The bell > **Turn off alerts** stops them until switched on again.

## Notes
- Works only on the production build (the service worker is not registered in `npm run dev`).
- Dead devices (app uninstalled, permission revoked) are removed automatically the next time a send fails with 404/410.
- Notifications pass through the browser vendor's push service (Google / Apple / Mozilla), encrypted end to end. The text shows name and area only, never the phone number.
- Firestore rules stay deny-all; only the server touches `pushSubscriptions`.
- Not tested on real phones yet (only in a desktop browser with mocked permission, plus a direct check of the encrypted send). Do a real end-to-end test after deploy: submit the form on the live site and watch your phone.
