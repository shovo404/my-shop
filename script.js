import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// এখানে আপনার সেই ৫-৬ লাইনের Config কোডটি বসাবেন
const firebaseConfig = {
  apiKey: "AIzaSyBntmghsgXmWa_dCP9-T59Q_6qt8pbxJRI",
  authDomain: "my-premium-shop.firebaseapp.com",
  projectId: "my-premium-shop",
  storageBucket: "my-premium-shop.firebasestorage.app",
  messagingSenderId: "710447563935",
  appId: "1:710447563935:web:cf5cafffa8cc2e211c0eaa"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const colRef = collection(db, "products");

// প্রোডাক্ট দেখানোর জন্য (User Page)
const productList = document.getElementById('product-list');
if(productList) {
    onSnapshot(colRef, (snapshot) => {
        productList.innerHTML = "";
        snapshot.forEach(d => {
            const item = d.data();
            productList.innerHTML += `
                <div class="bg-gray-800 p-5 rounded-xl shadow-lg border border-gray-700" data-aos="zoom-in">
                    <h2 class="text-xl font-bold">${item.name}</h2>
                    <p class="text-blue-400 text-2xl font-black mt-2">৳${item.price}</p>
                </div>`;
        });
    });
}

// প্রোডাক্ট অ্যাড করার জন্য (Admin Page)
const addBtn = document.getElementById('addBtn');
if(addBtn) {
    addBtn.onclick = async () => {
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        await addDoc(colRef, { name, price: price });
        alert("Success!");
    };
}
