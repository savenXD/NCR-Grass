#!/usr/bin/env node
/**
 * Creates the key pair for enquiry alerts (Web Push / VAPID). Run once: `npm run vapid`.
 * Put both values in .env.local AND on the host as VAPID_PUBLIC_KEY / VAPID_PRIVATE_KEY.
 * The private key is a secret. Changing the pair later makes every device re-subscribe (open the app and allow again).
 */
import webpush from "web-push"

const { publicKey, privateKey } = webpush.generateVAPIDKeys()
console.log(`VAPID_PUBLIC_KEY="${publicKey}"`)
console.log(`VAPID_PRIVATE_KEY="${privateKey}"`)
console.log('# optional: VAPID_SUBJECT="mailto:you@example.com"  (defaults to the site URL)')
