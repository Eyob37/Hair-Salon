document.addEventListener('DOMContentLoaded', () => {
  const ordersContainer = document.getElementById('ordersContainer');
  const noOrdersMessage = document.getElementById('noOrders');
  const clearOrdersBtn = document.getElementById('clearOrders');

  // Load and display orders
  function displayOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    if (orders.length === 0) {
      noOrdersMessage.style.display = 'block';
      ordersContainer.innerHTML = '';
      ordersContainer.appendChild(noOrdersMessage);
      return;
    }
    
    noOrdersMessage.style.display = 'none';
    ordersContainer.innerHTML = '';
    
    // Sort orders by date (newest first)
    orders.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    orders.forEach((order, index) => {
      const orderCard = document.createElement('div');
      orderCard.className = 'order-card';
      
      // Format date and time
      const orderDate = new Date(order.timestamp);
      const formattedDate = orderDate.toLocaleDateString('am-ET');
      const formattedTime = orderDate.toLocaleTimeString('am-ET', { hour: '2-digit', minute: '2-digit' });
      
      // Calculate total and generate services HTML
      let total = 0;
      let servicesHTML = '';      
      if (order.service && order.service.length > 0) {
        servicesHTML = order.service.map(service => {
          if (service && service.name && service.price) {
            total += Number(service.price);
            return `
              <div class="service-item">
                <span>${service.name}</span>
                <span>${service.price} ብር</span>
              </div>
            `;
          }
          return '';
        }).join('');
      }
      
      // Create order HTML
      orderCard.innerHTML = `
        <div class="order-header">
          <span>ትዕዛዝ #${index + 1}</span>
          <span>${formattedDate} ${formattedTime}</span>
        </div>
        
        <div class="order-services">
          <h3>አገልግሎቶች</h3>
          ${servicesHTML || '<p>አገልግሎት አልተመረጠም</p>'}
          <div class="order-total">
            ጠቅላላ: ${total} ብር
          </div>
        </div>
        
        <div class="order-customer">
          <h3>የደንበኛ መረጃ</h3>
          <p><strong>ስም:</strong> ${order.name || 'አልተመለከተም'}</p>
          <p><strong>ስልክ:</strong> ${order.phone || 'አልተመለከተም'}</p>
          <p><strong>የቀጠሮ ቀን:</strong> ${order.date || 'አልተመለከተም'}</p>
          <p><strong>ሰዓት:</strong> ${order.time || 'አልተመለከተም'}</p>
        </div>
      `;
      
      ordersContainer.appendChild(orderCard);
    });
  }
  
  // Clear all orders
  clearOrdersBtn.addEventListener('click', () => {
    if (confirm('ሁሉንም ትዕዛዞች ማጥፋት ይፈልጋሉ?')) {
      localStorage.removeItem('orders');
      displayOrders();
    }
  });
  
  // Initial display
  displayOrders();
});