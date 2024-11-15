
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
    login.setAttribute('aria-hidden', 'false');
    login.style.display = 'block';
    close.focus();
  });
}
 if (close) {
  close.addEventListener('click', function() {
    close.setAttribute('aria-hidden', 'false');
  login.style.display = 'none';
  icon.focus();
  });
 }
  window.addEventListener('click', function(event){
    if (event.target == login) {
      login.setAttribute('aria-hidden', 'true');
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
  // FR1.2 Shall provide a search functionality for quick access to specific items. 
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
  prevButton.addEventListener('click', function() {
    if (position < 0) {
      position += itemWidth;
      track.style.transform = `translateX(${position}px)`;
    }
  });
});


  
 //Form logic //
  document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
  
    // Collect form data
    const formData = {
      Name: document.getElementById('name').value,
      Email: document.getElementById('email').value,
      Comment: document.getElementById('comment').value
    };
  
    // Send form data to server using AJAX
    fetch('/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('app 1 Server response:', data);
      // Optionally handle the server response here
    })
    .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
    });
  });


  // After posting data successfully
fetch('http://localhost:3000/submitted-data') // New endpoint to retrieve posted data
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(data => {
  console.log('Data received:', data);
  if (slide && data.length > 0) {
    slide.innerHTML = '';
    data.forEach(item => {
      const featuredItem = document.createElement('div');
      featuredItem.className = 'featured-item';
      featuredItem.setAttribute('aria-label', 'Featured item');
      const pic = document.createElement('img');
      pic.src = item.cuckooPic;
      // FR1.3 All images and media shall provide alternative text.
      pic.alt = `${item.cuckooName} image`;
      pic.className = 'featured-pic';
      pic.setAttribute('aria-label', `Image of ${item.cuckooName}`);

      const info = document.createElement('div');
      info.className = 'featured-info';
      info.setAttribute('aria-label', 'Item information');

      const name = document.createElement('h3');
      name.className = 'featured-name';
      name.textContent = item.cuckooName;
      name.setAttribute('aria-label', `Name: ${item.cuckooName}`);

      const price = document.createElement('p');
      price.className = 'featured-price';
      price.textContent = `${item.cuckooPrice}€`;
      price.setAttribute('aria-label', `Price: ${item.cuckooPrice}`);

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
  if (slide.children.length > 0) {
  const width = slide.children[position].offsetWidth;
  slide.style.transform = `translateX(-${position * width}px)`;
  }
};

if (prevButton) {
  prevButton.addEventListener('click', () => {
    if (position > 0) {
      position--;
      updatePosition();
    }
  });
}
if (nextButton) {
  nextButton.addEventListener('click', () => {  
    if (position < slide.children.length -1) {
    position++;
    updatePosition();
  }
});
}
updateSlideItems();


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
    productElement.setAttribute('aria-label', 'Product item');

    const productLink = document.createElement('a');
    productLink.href = `cuckoo-detail.html?id=${item.id}`;
    productLink.className = 'product-link';
    productLink.setAttribute('aria-label', `Details of ${item.cuckooName}`);

   if(item.cuckooPic) {
     const productImage = document.createElement('img');
     productImage.src = item.cuckooPic;
     productImage.alt = `${item.cuckooName}, image`;
     productImage.setAttribute('aria-label', `Image of: ${item.cuckooName}`);
     productLink.appendChild(productImage);
   }
   //FR1.1 Shall support keyboard navigation and be compatible with screen readers. 
   productElement.setAttribute('role', 'article');
   productElement.setAttribute('aria-label', `Item ${item.cuckooName}`);

  const productTile = document.createElement('h3');
   productTile.textContent = item.cuckooName;
   productTile.setAttribute('aria-label', `Item ${item.cuckooName}`);
   productLink.appendChild(productTile);

   const productDescription = document.createElement('p');
   productDescription.textContent = item.cuckooDesc;
   productLink.appendChild(productDescription);

   const productPrice = document.createElement('div');
   productPrice.className = 'price';
   productPrice.textContent = `€${parseFloat(item.cuckooPrice).toFixed(2)}`;
   productLink.appendChild(productPrice);

   const productStatus = document.createElement('div');
   productStatus.textContent = item.cuckooStatus;
    productLink.appendChild(productStatus);

    productElement.appendChild(productLink);
   catalogItemsContainer.appendChild(productElement);
    });
  }
  })
  .catch(error => console.error('Error fetching catalog items', error));
}  
fetchCatalogItems();
// filtering logic
if (statusFilterContainer) {
fetch('http://localhost:3000/status')
.then(response => response.json())
.then(status => {
  const allList = document.createElement('li');
  const allA = document.createElement('a');
  allA.href = '#';
  allA.textContent = 'Show All';
  allA.className ='filter';
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
    a.className = 'filter';
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
const reqServiceButton = document.getElementById('reqServiceButton');
if (reqServiceButton) {
  reqServiceButton.addEventListener('click', function() {
    window.location.href = 'service-form.html';
  });
}
//FR2. The web app shall allow users of all abilities to request restoration services.  
  const serviceRequestForm = document.getElementById('serviceRequest');
  if (serviceRequestForm) {
serviceRequestForm.addEventListener('submit', function(event){
  event.preventDefault();

  const formData = new FormData(event.target);
  /* FR2.1 Request form shall allow users to input their name, email, phone number, 
     description of the restoration needed, and any specific requirements. 
     FR2.2 The form shall allow users to add images to support their request. */ 
  fetch('/request/submit-request', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  //FR2.3 Upon submission, the user shall be informed of the successful request reception and case number.
  .then(result => {
    if (result.success){
      document.getElementById('requestID').textContent = result.requestID;
      document.getElementById('successMessage').hidden = false;
    }
  })
  .catch(error => console.error('Error:', error));
});
}

// cancel form event handler
const cancelButton = document.getElementById('cancelButton');
if (cancelButton){
  cancelButton.addEventListener('click', function(){
  window.location.href = 'service.html';
});
}
//close success message event handler
const closeButton = document.getElementById('closeButton');
if (closeButton){
  closeButton.addEventListener('click', function(){
  document.getElementById('successMessage').hidden = true;
});
}

// small devices logic
const menu = document.querySelector('.menu');
const mainNav = document.querySelector('.main-navigation');
if (menu) {
  menu.addEventListener('click', function() {
    mainNav.classList.toggle('show');
  });
}

// product detail logic
const reserveBtn = document.getElementById('reserve-btn');
const moreInfoBtn = document.getElementById('more-btn');

if (reserveBtn) {
  reserveBtn.addEventListener('click', function() {
    alert('Product Reserved!');
  });
}
if (moreInfoBtn) {
  moreInfoBtn.addEventListener('click', function(){
    alert('More info here');
  });
}

const productId = getProductIdFromUrl();
if (productId) {
  fetchProductDetails(productId);
}

function fetchProductDetails(id) {
  fetch(`http://localhost:3000/catalog/${id}`)
  .then(response => response.json())
  .then(data => {
    document.getElementById('product-img').src = data.cuckooPic;
    document.getElementById('product-name').textContent = data.cuckooName;
    document.getElementById('product-desc').textContent = data.cuckooDesc;
    document.getElementById('restoration-status').textContent = data.cuckooStatus;
    document.getElementById('product-price').textContent = `${data.cuckooPrice}€`;
  })
  .catch(error => console.error('Error fetching product details:', error));
}

function getProductIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}
});


