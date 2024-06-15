//Search nav bar //
document.addEventListener('DOMContentLoaded', function(){
  var searchInput = document.querySelector('.search-input');
  var searchButton = document.querySelector('.search-button');

  searchButton.addEventListener('click', function (event){
    if(document.activeElement !== searchInput) {
      event.preventDefault();
      searchInput.focus();
    }
  });
});
//Slideshow function//  
document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.slide-track');
  const prevButton = document.querySelector('.slide-prev');
  const nextButton = document.querySelector('.slide-next');
  const items = document.querySelectorAll('.featured-item');
  const itemWidth = items[0].offsetWidth; // gives error, fix
  let position = 0;

  nextButton.addEventListener('click', function() {
    if (position > -(items.length - 1) * itemWidth) {
      position -= itemWidth;
      track.style.transform = `translateX(${position}px)`;
    }
  });

  prevButton.addEventListener('click', function() {
    if (position < 0) {
      position += itemWidth;
      track.style.transform = `translateX(${position}px)`;
    }
  });
});

//catalog logic
document.addEventListener('DOMContentLoaded', function(){
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
    })
    .catch(error => console.error('Error fetching catalog items', error));
  }  
  // filtering logic
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
  

fetchCatalogItems();
});
// service logic to access service form
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('reqServiceButton').addEventListener('click', function(){
    window.location.href = 'service-form.html'
  });
});
  
  //Form logic
document.getElementById('serviceRequest').addEventListener('submit', function(event){
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

// cancel form button
document.getElementById('cancelButton').addEventListener('click', function(){
  window.location.href = 'service.html';
});

//close button 
document.getElementById('closeButton').addEventListener('click', function(){
  document.getElementById('successMessage').hidden = true;
});
