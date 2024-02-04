import { signInWithPopup, signOut, User } from 'firebase/auth';
import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  DocumentData,
  collection,
  query,
  where,
} from 'firebase/firestore';

import { Collections } from 'api/types';
import { auth, db } from 'appConfig';
import { provider } from 'components/layout/signIn/config';

export const signInWithPopupApi = async (): Promise<User> => {
  const response = await signInWithPopup(auth, provider);
  const { user } = response;

  return user;
};

interface CheckDocsInDBProps {
  uid: string;
  collectionName: Collections;
}

export const checkDocsInDB = async ({
  uid,
  collectionName,
}: CheckDocsInDBProps): Promise<Nullable<DocumentData>> => {
  const collect = doc(db, collectionName, uid);
  const docSnap = await getDoc(collect);

  if (!docSnap.exists()) {
    return null;
  }

  return docSnap.data();
};

interface DocsInDB {
  uid: string;
  collectionName: Collections;
  data: DocumentData;
}

export const setDocsInDB = async ({
  uid,
  collectionName,
  data,
}: DocsInDB): Promise<void> => {
  const collectionRef = collection(db, collectionName);

  await setDoc(doc(collectionRef, uid), data);
};

export const updateDocsInDB = async ({
  uid,
  collectionName,
  data,
}: DocsInDB): Promise<void | boolean> => {
  const washingtonRef = doc(db, collectionName, uid);

  const response = await updateDoc(washingtonRef, data);

  return response;
};

interface CheckFieldInDocsInDBProps {
  nickname: string;
  collectionName: Collections;
  checkField: string;
}

export const checkFieldInDocsInDB = async ({
  nickname,
  collectionName,
  checkField,
}: CheckFieldInDocsInDBProps): Promise<boolean> => {
  const q = query(collection(db, collectionName), where(checkField, '==', nickname));

  const queryDocs = await getDocs(q);

  return !!queryDocs.docs.length;
};

export const signOutApi = async (): Promise<void> => {
  const response = await signOut(auth);

  return response;
};
