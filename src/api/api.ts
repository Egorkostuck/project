import { signInWithPopup, UserCredential, signOut, User, AuthError } from 'firebase/auth';
import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  DocumentData,
  collection,
  query,
  where,
} from 'firebase/firestore';

import { UserRole, Collections } from 'api/config';
import { auth, provider, db } from 'components/layout/signIn/config';

export const signInWithPopupApi = async (): Promise<User | AuthError> => {
  return signInWithPopup(auth, provider)
    .then((result: UserCredential) => {
      const { user } = result;

      return user;
    })
    .catch(error => {
      return error;
    });
};

export const checkUserInDB = async (uid: string): Promise<Nullable<DocumentData>> => {
  const collect = doc(db, Collections.Users, uid);
  const docSnap = await getDoc(collect);

  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data());

    return docSnap.data();
  }

  return null;
};

interface UserDataProps {
  user: User;
  nickname: string;
}

export const setUserInDB = async ({
  user,
  nickname,
}: UserDataProps): Promise<boolean> => {
  const usersRef = collection(db, Collections.Users);

  const isPromise = await setDoc(doc(usersRef, user.uid), {
    name: nickname,
    displayName: user.displayName,
    email: user.email,
    createdAt: user.metadata.creationTime,
    role: UserRole.User,
    balance: 0,
  })
    .then(() => {
      return true;
    })
    .catch(error => {
      console.log('error set user', error);

      return false;
    });

  return isPromise;
};

export const checkUserNicknameInDB = async (nickname: string): Promise<boolean> => {
  const q = query(collection(db, Collections.Users), where('name', '==', nickname));

  const queryDocs = await getDocs(q)
    .then(docs => {
      if (docs.docs.length) {
        return false;
      }

      return true;
    })
    .catch(error => {
      // in feature need add logger Error
      console.log('Error check user', error);

      return true;
    });

  return queryDocs;
};

export const signOutApi = (): void => {
  signOut(auth)
    .then(() => {
      console.log('signOut success');
    })
    .catch(error => {
      console.log('signOut error', error);
    });
};
