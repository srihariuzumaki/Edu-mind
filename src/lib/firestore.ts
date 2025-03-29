import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { app } from './firebaseConfig';
import { User } from 'firebase/auth';

const db = getFirestore(app);

export interface UserData {
  email: string;
  displayName?: string;
  createdAt: Date;
  lastLogin: Date;
  role?: 'admin' | 'teacher' | 'student';
  preferences?: {
    theme?: 'light' | 'dark';
    notifications?: boolean;
  };
}

export async function createUserDocument(user: User) {
  const userRef = doc(db, 'users', user.uid);
  const userData: UserData = {
    email: user.email!,
    displayName: user.displayName || undefined,
    createdAt: new Date(),
    lastLogin: new Date(),
    role: 'student', // Default role for new users
    preferences: {
      theme: 'dark',
      notifications: true
    }
  };

  await setDoc(userRef, userData);
  return userData;
}

export async function getUserData(userId: string) {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    return userSnap.data() as UserData;
  }
  return null;
}

export async function updateUserLastLogin(userId: string) {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    lastLogin: new Date()
  });
}

export async function updateUserPreferences(userId: string, preferences: Partial<UserData['preferences']>) {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    preferences: preferences
  });
} 