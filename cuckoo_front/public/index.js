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
  const itemWidth = items[0].offsetWidth;
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


  
 /*  //Form logic //
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
}); */