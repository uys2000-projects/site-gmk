import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCbRLFXRlTbc-YZydtAY1h12TGwtpEueEw",
  authDomain: "gmkwebapp.firebaseapp.com",
  projectId: "gmkwebapp",
  storageBucket: "gmkwebapp.appspot.com",
  messagingSenderId: "143733805101",
  appId: "1:143733805101:web:f316f0c8e1b8039813a8a4",
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const db = getFirestore(firebaseApp);

export const getCollection = function (collectionName) {
  const colRef = collection(db, collectionName);
  return getDocs(colRef);
};
export const getCollectionFromArray = function (collectionName, array) {
  const colRef = collection(db, collectionName);
  const q = query(colRef, where("regions", "in", array));
  return getDocs(q);
};
export const getDocument = function (collectionName, docName) {
  const docRef = doc(db, collectionName, docName);
  return getDoc(docRef);
};
export const getDocumentForTeam = function (collectionName, team) {
  const colRef = collection(db, collectionName);
  const docRef = query(colRef, where("team", "==",team ));
  return getDocs(docRef);
};
export const readDocumentItem = function (document, item) {
  return document.get(item);
};
export const getImage = function (imageAdress) {
  if (imageAdress) {
    const refImage = ref(storage, imageAdress);
    return getDownloadURL(refImage);
  } else {
    return new Promise(function(retruner){
      retruner("")
    });
  }
};
