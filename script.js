import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

const productGrid = document.getElementById('product-grid');

onSnapshot(collection(db, "products"), (snapshot) => {
    productGrid.innerHTML = "";
    snapshot.forEach((doc) => {
        const item = doc.data();
        productGrid.innerHTML += `
            <div class="service-card p-6 rounded-3xl animate__animated animate__fadeInUp">
                <div class="relative h-48 rounded-2xl overflow-hidden mb-6 group">
                    <img src="${item.image || 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop'}" 
                         class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="${item.name}">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div class="flex justify-between items-start mb-4">
                    <h3 class="text-xl font-bold text-white">${item.name}</h3>
                    <span class="bg-blue-500/20 text-blue-400 text-[10px] px-2 py-1 rounded font-bold uppercase">Hot</span>
                </div>
                <div class="flex items-end justify-between mb-6">
                    <div>
                        <p class="text-gray-500 text-xs mb-1 font-semibold uppercase tracking-wider">Start from</p>
                        <p class="text-3xl font-black text-white">৳${item.price}</p>
                    </div>
                </div>
                <button onclick="window.location.href='https://wa.me/YOUR_NUMBER'" 
                        class="w-full bg-white/5 hover:bg-blue-600 border border-white/10 hover:border-blue-600 text-white py-4 rounded-2xl font-bold transition-all duration-300">
                    Order via WhatsApp
                </button>
            </div>
        `;
    });
});
