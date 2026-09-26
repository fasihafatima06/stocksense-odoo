/**
 * firebase.js — Firebase Authentication wrapper
 * Loads Firebase SDK dynamically from CDN only when actually needed.
 * In development mode (no API key), authentication is bypassed.
 */

const config = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

let auth;

async function getAuth() {
  if (auth) return auth;

  if (!config.apiKey) {
    throw new Error(
      'Firebase client configuration is missing. Add VITE_FIREBASE_* values to .env, or use dev-mode login.'
    );
  }

  const base = 'https://www.gstatic.com/firebasejs/11.2.0';
  const appSdk = await import(/* @vite-ignore */ `${base}/firebase-app.js`);
  const sdk    = await import(/* @vite-ignore */ `${base}/firebase-auth.js`);

  auth = {
    instance: sdk.getAuth(appSdk.initializeApp(config)),
    sdk,
  };
  return auth;
}

export async function signIn(email, password) {
  const a = await getAuth();
  return a.sdk.signInWithEmailAndPassword(a.instance, email, password);
}

export async function signUp(name, email, password) {
  const a = await getAuth();
  const credential = await a.sdk.createUserWithEmailAndPassword(a.instance, email, password);
  await a.sdk.updateProfile(credential.user, { displayName: name });
  return credential;
}

export const firebaseToken = (user) => user.getIdToken();
