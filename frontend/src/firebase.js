import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey:"AIzaSyCpc7ZklmgZUrQwofJDQnbjRINvWnmm2fQ",
  authDomain: "mytube-6f1c7.firebaseapp.com",
  projectId: "mytube-6f1c7",
  storageBucket: "mytube-6f1c7.appspot.com",
  messagingSenderId: "451024407495",
  appId: "1:451024407495:web:9a2db2401d22f67ea027e2"
};

const app = initializeApp(firebaseConfig);
// export const auth = getAuth();
// export const provider = new GoogleAuthProvider();

export default app;