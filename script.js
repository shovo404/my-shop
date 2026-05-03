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

// Services Sync
onSnapshot(collection(db, "products"), (snap) => {
    const catList = document.getElementById('cat-list');
    const serList = document.getElementById('ser-list');
    const desc = document.getElementById('ser-desc');
    
    catList.innerHTML = "<option>Choose Platform...</option>";
    snap.forEach(d => {
        catList.innerHTML += `<option value="${d.id}">${d.data().name}</option>`;
    });

    catList.onchange = () => {
        const selected = snap.docs.find(doc => doc.id === catList.value);
        if(selected) {
            const data = selected.data();
            serList.innerHTML = `<option>৳${data.price} - High Quality Service</option>`;
            desc.innerHTML = `<p>Quality: Real</p><p>Refill: ${data.refill || 'No'}</p><p>Speed: Fast</p>`;
        }
    };
});
