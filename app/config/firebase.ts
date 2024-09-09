// app/config/firebase.ts
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Đảm bảo rằng bạn đã định nghĩa biến môi trường trong .env.local
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: "ptit-ntc-project.firebaseapp.com",
  projectId: "ptit-ntc-project",
  storageBucket: "ptit-ntc-project.appspot.com",
  messagingSenderId: "371535166857",
  appId: "1:371535166857:web:878b6a397596b2737fb558"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Xuất khẩu các phương thức cần thiết
export { storage, ref, uploadBytes, getDownloadURL };