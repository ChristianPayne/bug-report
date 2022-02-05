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
  DocumentSnapshot
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
const app = initializeApp(firebaseConfig);
const db = getFirestore()

const collections = {
  users : fire_collection(db, "users"),
  reports : fire_collection(db, "reports"),
  reportTemplates : fire_collection(db, "reportTemplates")
}


// CRUD
export async function addDocument (collection: string, document: Object) {
  
}

export async function getDocument(collection: string, path: string) : Promise<DocumentData> {
  const docRef: DocumentReference = doc(db, collections[collection], path);
  console.log(docRef);
  
  const docSnap: DocumentSnapshot = await getDoc(docRef);

  console.log("Data:", docSnap.exists());
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data()
  } else {
    throw new Error("No document found!")
  }
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
  try {
    const docRef = await addDoc(fire_collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}