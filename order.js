import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, onValue, get, onDisconnect } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBg3ZDrhUzFL028IaZ8vc7LNUDH7QPk60o",
  authDomain: "haymanot-tsegur-bet.firebaseapp.com",
  projectId: "haymanot-tsegur-bet",
  storageBucket: "haymanot-tsegur-bet.firebasestorage.app",
  messagingSenderId: "225863250013",
  appId: "1:225863250013:web:81e7be55a59f205b939db4",
  measurementId: "G-F9PNTP7JZN"
};

        // Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const gameRef = ref(database, "hairSalon");

document.addEventListener('DOMContentLoaded', () => {
   const selectedServices = JSON.parse(localStorage.getItem('selectedService'));  
  const serviceDisplay = document.getElementById('selectedService');
  
  if (selectedServices) {
      serviceDisplay.innerHTML = "";
      serviceDisplay.innerHTML = " <h3>የትዕዛዝ መረጃ</h3>";
      let div = document.createElement("div");
      div.classList.add("service");
      serviceDisplay.appendChild(div);
      let sum = 0;
      selectedServices.forEach(selectedService => {         
          div.innerHTML += `
            <strong>${selectedService.name}</strong> - ${selectedService.price} ብር <br><br>                 
        `;
        sum += Number(selectedService.price);   
    });
    div.innerHTML += ` <strong>ድምር </strong> = ${sum}`;
  } else {
    serviceDisplay.innerHTML = '<p>አገልግሎት አልተመረጠም</p>';
  }
  
  document.getElementById('orderForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const order = {
      service: selectedServices,
      name: document.getElementById('name').value,
      phone: document.getElementById('phone').value,
      date: document.getElementById('date').value,
      time: document.getElementById('time').value,
      timestamp: new Date().toISOString()
    };
    
    // Save order to localStorage (in a real app, you would send to a server)
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    set(gameRef, order);
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    alert('ትዕዛዝዎ ተመዝግቧል! እናመሰግናለን!');
    window.location.href = 'index.html';
  });
});