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

// catalog logic//
document.addEventListener('DOMContentLoaded', () => {
  fetchProducts();
});
function fetchProducts() {
  fetch('http://localhost:3000/catalog/all')
  .then(response => response.json())
  .then(products => {
    displayProducts(products);
  })
  .catch(error => console.error('Error fetching products:', error));
}
function displayProducts(products) {
  const catalogContainer = document.getElementById('catalog-items');
  catalogContainer.innerHTML = '';
  products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.className = 'product';
    productElement.setAttribute('role', 'article');
    productElement.setAttribute('aria-label', `Item ${product.id}`);
    const productTile = document.createElement('h2');
    productTile.textContent = product.cuckooName;
    productElement.appendChild(productTile);
    const productPrice = document.createElement('div');
    productPrice.textContent = `€${parseFloat(product.cuckooPrice).toFixed(2)}`;
    productElement.appendChild(productPrice);
    const productStatus = document.createElement('div');
    productStatus.textContent = product.cuckooStatus;
    productElement.appendChild(productStatus);
    const productDescription = document.createElement('p');
    productDescription.textContent = product.cuckooDesc;
    productElement.appendChild(productDescription);

    if(product.cuckooPic) {
      const productImage = document.createElement('img');
      productImage.src = product.cuckooPic;
      productImage.alt = product.cuckooName;
      productElement.appendChild(productImage);
    }
    catalogContainer.appendChild(productElement);
  });
}
/*document.addEventListener('DOMContentLoaded', function(){
  const catalogItemsContainer = document.querySelector('.catalog-items');

  fetch('http://localhost:3000/catalog/all')
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.className = 'item';
      itemElement.setAttribute('role', 'article');
      itemElement.setAttribute('aria-label', `Item ${item.id}`);
      const itemImage = document.createElement('img');
      itemImage.src = `/images/${item.image}`;
      itemImage.alt = `Image of ${item.title}`;
      const itemTitle = document.createElement('h3');
      itemTitle.textContent = item.title;
      const itemDescription = document.createElement('p');
      itemDescription.textContent = item.description;
      const itemPrice = document.createElement('p');
      itemPrice.textContent = `Price: €${item.price}`;
      const itemStatus = document.createElement('p');
      itemStatus.textContent = `Status: ${item.status}`;

      itemElement.appendChild(itemImage);
      itemElement.appendChild(itemTitle);
      itemElement.appendChild(itemDescription);
      itemElement.appendChild(itemPrice);
      itemElement.appendChild(itemStatus);
      catalogItemsContainer.appendChild(itemElement);
    });
  })
  .catch(error => console.error('Error fetching catalog items: ', error));
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
  console.log('app 1 Posted data:', data);
  // Optionally handle the posted data here
})
.catch(error => {
  console.error('There was a problem with your fetch operation:', error);
});*/