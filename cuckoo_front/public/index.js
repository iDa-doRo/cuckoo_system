
// listening to DOM
document.addEventListener('DOMContentLoaded', function() {
 // login logic 
  var login = document.getElementById('login-modal');
  var icon = document.querySelector(".user-i");
  var close = document.getElementsByClassName("close-login")[0];
  var form = document.getElementById("login-form");
  var err = document.getElementById("login-error");

if (icon) {
  icon.addEventListener('click', function(){
    login.style.display = 'block';
  });
}
 if (close) {
  close.addEventListener('click', function() {
  login.style.display = 'none';
  });
 }
  window.addEventListener('click', function(event){
    if (event.target == login) {
      login.style.display = 'none';
    }
  });

  if (form) {
  form.addEventListener('submit', function(event){
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username:username, password:password }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        window.location.href = 'http://localhost:3001/dashboard.html';
      } else {
        err.style.display = 'block';
        err.textContent = data.message;
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
  }

  //search
  var searchInput = document.querySelector('.search-input');
  var searchButton = document.querySelector('.search-button');

  if (searchButton){
    searchButton.addEventListener('click', function(event){
      if(document.activeElement !== searchInput) {
        event.preventDefault();
        searchInput.focus();
      }
    });
  }
 // slideshow
  const track = document.querySelector('.slide-track');
  const prevButton = document.querySelector('.slide-prev');
  const nextButton = document.querySelector('.slide-next');
  const items = document.querySelectorAll('.featured-item');
  const itemWidth = items [0] ? items[0].offsetWidth: 0; // gives error, fix
  let position = 0;

if (nextButton && track) {
  nextButton.addEventListener('click', function() {
    if (position > -(items.length -1) * itemWidth){
      position -= itemWidth;
      track.style.transform = `translateX(${position}px)`;
    }
  });
}

if (prevButton && track) {
  prevButton.addEventListener('click', function() {
    if (position < 0){
      position += itemWidth;
      track.style.transform = `translateX(${position}px)`;
    }
  });
}
// catalog 
const catalogItemsContainer = document.querySelector('.catalog-items');
const statusFilterContainer = document.getElementById('status-filter');

function fetchCatalogItems(status) {
  let url = 'http://localhost:3000/catalog';
  if (status) {
    url += `?status=${encodeURIComponent(status)}`;
  }
  fetch(url)
  .then(response => response.json())
  .then(data => {
    if (catalogItemsContainer) {
    catalogItemsContainer.innerHTML = '';
    data.forEach(item => {
    const productElement = document.createElement('div');
   productElement.className = 'product';   
   if(item.cuckooPic) {
     const productImage = document.createElement('img');
     productImage.src = item.cuckooPic;
     productImage.alt = item.cuckooName;
     productElement.appendChild(productImage);
   }
   productElement.setAttribute('role', 'article');
   productElement.setAttribute('aria-label', `Item ${item.cuckooName}`);
  const productTile = document.createElement('h3');
   productTile.textContent = item.cuckooName;
   productElement.appendChild(productTile);
   const productDescription = document.createElement('p');
   productDescription.textContent = item.cuckooDesc;
   productElement.appendChild(productDescription);const productPrice = document.createElement('div');
   productPrice.textContent = `€${parseFloat(item.cuckooPrice).toFixed(2)}`;
   productElement.appendChild(productPrice);
   const productStatus = document.createElement('div');
   productStatus.textContent = item.cuckooStatus;
   productElement.appendChild(productStatus);

   catalogItemsContainer.appendChild(productElement);
    });
  }
  })
  .catch(error => console.error('Error fetching catalog items', error));
}  
// filtering logic
if (statusFilterContainer) {
fetch('http://localhost:3000/status')
.then(response => response.json())
.then(status => {
  const allList = document.createElement('li');
  const allA = document.createElement('a');
  allA.href = '#';
  allA.textContent = 'Show All';
  allA.setAttribute('aria-label', 'show all');
  allA.addEventListener('click', (e) => {
    e.preventDefault();
    fetchCatalogItems();
  });
  allList.appendChild(allA);
  statusFilterContainer.appendChild(allList);
  //status options
  status.forEach(status => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = status.cuckooStatus;
    a.setAttribute('aria-label', status.cuckooStatus);
    a.addEventListener('click', (e) => {
      e.preventDefault();
      fetchCatalogItems(status.cuckooStatus);
    });
    li.appendChild(a);
    statusFilterContainer.appendChild(li);
  });
})
.catch(error => console.error('Error fetching cuckoo status', error));
}

fetchCatalogItems();
});
// service logic to access service form
document.addEventListener('DOMContentLoaded', function() {
const reqServiceButton = document.getElementById('reqServiceButton');
if (reqServiceButton) {
  reqServiceButton.addEventListener('click', function() {
    window.location.href = 'service-from.html';
  });
}
});
  
  //Form logic
  const serviceRequestForm = document.getElementById('serviceRequest');
  if (serviceRequestForm) {
serviceRequestForm.addEventListener('submit', function(event){
  event.preventDefault();

  const formData = new FormData(event.target);

  fetch('/request/submit-request', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(result => {
    if (result.success){
      document.getElementById('requestID').textContent = result.requestID;
      document.getElementById('successMessage').hidden = false;
    }
  })
  .catch(error => console.error('Error:', error));
});
}

// cancel form button
const cancelButton = document.getElementById('cancelButton');
if (cancelButton){
  cancelButton.addEventListener('click', function(){
  window.location.href = 'service.html';
});
}
//close button 
const closeButton = document.getElementById('closeButton');
if (closeButton){
closeButton.addEventListener('click', function(){
  document.getElementById('successMessage').hidden = true;
});
}
