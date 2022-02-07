// Import the functions you need from the SDKs you need
import { FirebaseOptions, initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection as fire_collection, 
  getDocs,
  doc,
  getDoc,
  DocumentReference,
  DocumentSnapshot,
  setDoc,
  query as fire_query,
  QueryConstraint,
  updateDoc,
  CollectionReference,
  deleteDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig : FirebaseOptions = {
  apiKey: "AIzaSyDJ6TXaKdefVTlcMRaxmzgueKlSURwmG6M",
  authDomain: "bug-report-236ab.firebaseapp.com",
  databaseURL: "https://bug-report-236ab-default-rtdb.firebaseio.com",
  projectId: "bug-report-236ab",
  storageBucket: "bug-report-236ab.appspot.com",
  messagingSenderId: "990119089721",
  appId: "1:990119089721:web:296877ce2e50ed85ad9fe8"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore()

function collectionRef (collection: string) : CollectionReference {
  switch (collection) {
    case "users":
      return fire_collection(db, "users");
    case "reports":
      return fire_collection(db, "reports");
    case "reportTemplates":
      return fire_collection(db, "reportTemplates")
  }
}
function documentRef (collection: string, path: string = "") : DocumentReference {
  return doc(db, collection, path)
}


// CRUD
export async function addDocument (collection: string, document: {id: string}) : Promise<Object> {
  try {
    await setDoc(doc(db, collection, document.id), document);
    return document;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getDocument(collection: string, path: string) : Promise<Object> {
  const docRef: DocumentReference = documentRef(collection, path);
  const docSnap: DocumentSnapshot = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return {id: docRef.id, ...docSnap.data()}
  } else {
    throw new Error("No document found!")
  }
}

export async function getDocumentByRef (ref: DocumentReference) : Promise<Object> {
  const docSnap: DocumentSnapshot = await getDoc(ref);
  if(docSnap.exists()) {
    return docSnap.data()
  } else {
    throw new Error ("No document found!")
  }
}

export async function queryDocuments (collection: string, query: Array<QueryConstraint>) : Promise<Object[]> {
  const q = fire_query(collectionRef(collection), ...query);
  const querySnapshot = await getDocs(q);
  // console.log(querySnapshot);
  
  let dataArr = []
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    dataArr.push({id: doc.id, ...doc.data()})
  });
  return dataArr;
}

export async function getDocuments (collection: string) {
  const querySnapshot = await getDocs(collectionRef(collection));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => `, doc.data());
  });
}

export async function updateDocument (collection: string, path: string, document: any) : Promise<Boolean> {
  try {
    const ref = documentRef(collection, path);
    await updateDoc(ref, document);
    return true;
  } catch (error) {
    console.error("Update document error: ", error);
    return false;
  }
}

export async function setDocument (collection: string, path: string, document: any) {
  try {
    const ref = documentRef(collection, path);
    await setDoc(ref, document);
    return true
  } catch (error) {
    console.error("Set document error: ", error)
    return false
  }
}

export async function deleteDocument (collection: string, path: string) {
  try {
    const ref = documentRef(collection, path);
    await deleteDoc(ref);
    return true;
  } catch (error) {
    console.error("Delete document error: ", error);
    return false;
  }
}

export async function getCollectionRoot (collection: string) {
  let result = await getDocument(collection, "root");
  // console.log(result);
  return result;
}