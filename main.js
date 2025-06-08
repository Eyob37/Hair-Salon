let selectedService = [];
const services = [
  { name: "ፓይስትራ", price: 200 },
  { name: "ሳብሳብ", price: 200 },
  { name: "ፐርሊስ", price: 250 },
  { name: "ውሃ ከርል", price: 150 },
  { name: "ወቭ", price: 300 },
  { name: "ቁጥርጥር በዊግ", price: 200 },
  { name: "ቁጥርጥር በፀጉር", price: 150 },
  { name: "አልባሶ በ1 ዱላ", price: 350 },
  { name: "ጥፍር ልጥፍ", price: 350 },
  { name: "ጥፍር ቀለም መቀባት", price: 100 },
  { name: "በሳሙና", price: 70 },
  { name: "ሻምፖ", price: 50 },
  { name: "ቅቤ", price: 150 },
  { name: "ስቲም የፀጉር", price: 200 },
  { name: "ስቲም የፊት", price: 100 },
  { name: "ቅንድብ በምላጭ", price: 30 },
  { name: "ቅንድብ በክር", price: 50 }
];

const serviceList = document.getElementById('serviceList');
const search = document.getElementById('search');

function displayServices(filter = "") {
  serviceList.innerHTML = "";
  services
    .filter(s => s.name.includes(filter))
    .forEach(service => {
      const div = document.createElement("div");
      div.className = "service";
      div.innerHTML = `<strong>${service.name}</strong> - ${service.price} ብር`;
      div.onclick = () => {
        if (selectedService.includes(service)) {
          div.classList.remove("ak"); 
          selectedService.splice(selectedService.indexOf(service), 1);
          return;  // ✅ exit the onclick function here
        }
        selectedService.push(service);            
        div.classList.add("ak");          
      };
      serviceList.appendChild(div);
    });
}

search.addEventListener("input", e => {
  displayServices(e.target.value);
});

function goToSetOrder() {
   localStorage.setItem('selectedService', JSON.stringify(selectedService));
   window.location.href = 'setOrder.html';
}

displayServices();