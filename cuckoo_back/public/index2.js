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

document.addEventListener("DOMContentLoaded", () =>{
  const fetchData = () => {
    return {
      reservations: 7, 
      requests: 12
    };
  };
const updatePins =()=>{
  const data = fetchData();
  document.getElementById('reservation-pin').innerText = data.reservations;
  document.getElementById('requests-pin').innerText = data.requests;
};

updatePins();

setInterval(updatePins, 500000); //update pins every 5 min


});

/*// Define the displayData function
function displayData(data) {
    // Display the posted data on the UI of the second web app
    const dataListElement = document.getElementById('dataList');
    
    // Clear any existing data
    dataListElement.innerHTML = '';
  
  // Loop through each data item and create a division for each item
  data.forEach(item => {
    const divItem = document.createElement('div');
    divItem.classList.add('data-item'); // Optional: Add a class for styling

    // Create separate lines for each property value
    const nameLine = document.createElement('div');
    nameLine.textContent = `Name: ${item.name || 'N/A'}`;
    divItem.appendChild(nameLine);

    const emailLine = document.createElement('div');
    emailLine.textContent = `Email: ${item.email || 'N/A'}`;
    divItem.appendChild(emailLine);

    const commentLine = document.createElement('div');
    commentLine.textContent = `Comment: ${item.comment || 'N/A'}`;
    divItem.appendChild(commentLine);

    // Append the division to the container element
    dataListElement.appendChild(divItem);
  });
}
  
  // Fetch data asynchronously
  fetch('http://localhost:3000/submitted-data')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('app 2 Posted data:', data);
      // Call the displayData function with the fetched data
      displayData(data);
    })
    .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
    });*/
