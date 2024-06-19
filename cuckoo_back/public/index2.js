// General site logic
//Search nav bar
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

// Requests page logic
// logic to go back to dashboard usign the logo
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('admin-logo').addEventListener('click', function(){
    window.location.href = 'dashboard.html'
  });
});

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('cuckoo-clocks').addEventListener('click', function(){
    window.location.href = 'content.html'
  });
});
// logic to access admin requests page
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('requests-dash').addEventListener('click', function(){
    window.location.href = 'adminReq.html'
  });
});

// requests table logic
document.addEventListener('DOMContentLoaded', () => {
  // event listener to create requests table
 if (document.getElementById('request-table-body')) {
  fetchRequests();
  setInterval(fetchRequests, 300000) //automatically update every 5 minutes
 }
 // event listener to get count of requests
 if (document.getElementById('req-count')) {
  fetchReqCount();
  setInterval(fetchReqCount, 300000) //automatically update every 5 minutes
 }
 
 //event listener for requests dashboard pin
 if (document.getElementById('requests-pin')) {
  fetchDashReqCount();
  setInterval(fetchDashReqCount, 300000) //automatically update every 5 minutes
 }
  // event listener for new requests filtering button
  if (document.getElementById('new-request')) {
  document.getElementById('new-request').addEventListener('click', fetchNew);
  }
  // event listener for all requests filtering button
  if (document.getElementById('all-request')) {
    document.getElementById('all-request').addEventListener('click', fetchAll);
  }
});

// fetch and display requests
function fetchRequests(){
  fetch('requests')
  .then(response => response.json())
  .then(data=>createTableReq(data))
  .catch(error => console.error('error fetching new requests', error));
}

//fetch and display new requests
function fetchNew(){
  fetch('requests/new')
  .then(response => response.json())
  .then(data=>createTableReq(data))
  .catch(error => console.error('error fetching new requests', error));
}

//fetch and display requests count
function fetchReqCount() {
 fetch('/requests/count')
.then(response => response.json())
.then(data => {
  console.log('Request count data:', data); //debbuging data count
  updateReqCount(data);
})
.catch(error => console.error('error fetching the requests count', error));
}

//fetch and display all requests for the all requests button
function fetchAll(){
  fetch('requests')
  .then(response => response.json())
  .then(data=>createTableReq(data))
  .catch(error => console.error('error fetching new requests', error));
}

// function to create table with the database retreived data dinamically
function createTableReq(data){
  const tableBody = document.getElementById('request-table-body');
  tableBody.innerHTML = '';
  data.forEach(request =>{
    const reqRow = document.createElement('tr');
    const shortDate = new Date(request.reqDate).toLocaleDateString();//display date part of timestamp
    reqRow.innerHTML = 
    `<td>${request.id}</td>
    <td>${request.userName}</td>
    <td>${request.userEmail}</td>
    <td>${request.reqSubject}</td>
    <td>${shortDate}</td>`;
    tableBody.appendChild(reqRow);
  });
}
// function for request count logic in the requests page
function updateReqCount(data){
  console.log('Update request count');
  const newReqCount = document.getElementById('req-count');
  newReqCount.textContent= `${data.requestCount}`;
}

// Dashboard logic
// fetch and display requests count for the admin dashboard
function fetchDashReqCount() {
  fetch('/requests/count')
  .then(response => response.json())
  .then(data => {
    console.log('Dash request count data:', data); //debbuging data count
    updateDashReqCount(data);
  })
  .catch(error => console.error('error fetching the dash requests count', error));
}

// function for request count logic in the admin dashboard page
function updateDashReqCount(data) {
  console.log('Update dashboard request count');
  const dashReqCount = document.getElementById('requests-pin');
  if (dashReqCount) {
    dashReqCount.textContent = data.requestCount;
    dashReqCount.setAttribute('aria-label', `${data.requestCount} new requests`);
  }
}

