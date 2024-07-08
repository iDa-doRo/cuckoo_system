
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
  const slide = document.querySelector('.slide-track');
  const prevButton = document.querySelector('.slide-prev');
  const nextButton = document.querySelector('.slide-next');
  let position = 0;


function updateSlideItems() {
  console.log('Fetching restored items');
  fetch('http://localhost:3000/featured')
.then(response =>  {
    console.log('Response status', response.status);
   return response.json();
})
.then(data => {
  console.log('Data received:', data);
  if (slide && data.length > 0) {
    slide.innerHTML = '';
    data.forEach(item => {
      const featuredItem = document.createElement('div');
      featuredItem.className = 'featured-item';

      const pic = document.createElement('img');
      pic.src = item.cuckooPic;
      pic.alt = item.cuckooName;
      pic.className = 'featured-pic';

      const info = document.createElement('div');
      info.className = 'featured-info';

      const name = document.createElement('h3');
      name.className = 'featured-name';
      name.textContent = item.cuckooName;

      const price = document.createElement('p');
      price.className = 'featured-price';
      price.textContent = `${item.cuckooPrice}€`;

      info.appendChild(name);
      info.appendChild(price);
      featuredItem.appendChild(pic);
      featuredItem.appendChild(info);
      slide.appendChild(featuredItem);
    });
    updatePosition();
  }
})
.catch(error => console.error('Error tryinto to fetch data:', error));
}
const updatePosition = () => {
  const width = slide.children[position].offsetWidth;
  slide.style.transform = `translateX(-${position * width}px)`;
};

prevButton.addEventListener('click', () => {
  if (position > 0) {
    position--;
    updatePosition();
  }
});

nextButton.addEventListener('click', () => {
  if (position < slide.children.length -1) {
    position++;
    updatePosition();
  }
});
updateSlideItems();
});
      /* featuredItem.className = 'featured-item';
      featuredItem.setAttribute('aria-label', item.cuckooName);
      featuredItem.setAttribute('role', 'img');
      featuredItem.style.backgroundImage = `url(${item.cuckooPic})`;
      featuredItem.textContent = item.cuckooName;
      console.log(`Item: ${item.cuckooName}, Image URL: ${item.cuckooPic}`);

      const img = new Image();
      img.onload = function (){
        console.log(`Image successfully loaded:${item.cuckooPic}`);
      };
      img.onerror = function() {
        console.error(`Failed to load picture: ${item.cuckooPic}`);
      };
      img.src = item.cuckooPic; 
      slide.appendChild(featuredItem);
    });

  const items = document.querySelectorAll('.featured-item');
  const itemWidth = items [0] ? items[0].offsetWidth: 0;  

if (nextButton) {
  nextButton.addEventListener('click', function() {
    if (position > -(items.length -1) * itemWidth){
      position -= itemWidth;
      slide.style.transform = `translateX(${position}px)`;
    }
  });
}

if (prevButton) {
  prevButton.addEventListener('click', function() {
    if (position < 0){
      position += itemWidth;
      slide.style.transform = `translateX(${position}px)`;
    }
  });
}
}
})
.catch(error => console.error('error trying to fetch restored items', error));
}
updateSlideItems(); */

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
// service logic to access service form
document.addEventListener('DOMContentLoaded', function() {
const reqServiceButton = document.getElementById('reqServiceButton');
if (reqServiceButton) {
  reqServiceButton.addEventListener('click', function() {
    window.location.href = 'service-form.html';
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
