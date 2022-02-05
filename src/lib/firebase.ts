// Import the functions you need from the SDKs you need
import { FirebaseOptions, initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection as fire_collection, 
  addDoc, 
  getDocs,
  doc,
  getDoc,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  setDoc,
  query as fire_query,
  where,
  QueryConstraintType,
  QueryConstraint,
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

const collections = {
  users : fire_collection(db, "users"),
  reports : fire_collection(db, "reports"),
  reportTemplates : fire_collection(db, "reportTemplates")
}


// CRUD
export async function addDocument (collection: string, document: Object) : Promise<DocumentReference<DocumentData>> {
  try {
    const docRef = await addDoc(fire_collection(db, collection), document);
    console.log("Document written to DB: ", docRef);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getDocument(collection: string, path: string) : Promise<Object> {
  const docRef: DocumentReference = doc(db, collection, path);
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
  const q = fire_query(fire_collection(db, collection), ...query);
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot);
  
  let dataArr = []
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    dataArr.push({id: doc.id, ...doc.data()})
  });
  return dataArr;
}

export async function getDocuments (collection: string) {
  const querySnapshot = await getDocs(collections[collection]);
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => `, doc.data());
  });
}

export async function updateDocument (collection: string, document: Object) {
  
}

export async function deleteDocument (collection: string, id: string) {
  
}


export async function test() {
  
}