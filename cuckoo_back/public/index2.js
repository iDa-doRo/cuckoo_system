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
// logic to go back to dashboard usign the logo
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('admin-logo').addEventListener('click', function(){
    window.location.href = 'dashboard.html'
  });
});
//dummy data used to see if pins work
document.addEventListener("DOMContentLoaded", () =>{
  const fetchData = () => {
    return {
      reservations: 7, 
      requestsDash: 12
    };
  };
// pins to show new requests from dashboard
const updatePins =()=>{
  const data = fetchData();
  document.getElementById('reservation-pin').innerText = data.reservations;
  document.getElementById('requests-pin').innerText = data.requestsDash;
};
updatePins();
setInterval(updatePins, 500000); //update pins every 5 min
});
// logic to access cuckoo-clocks content page
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
  fetch('/requests')
  .then(response => response.json())
  .then(data => createTableReq(data))
  .catch(error => console.error('error fetching the requests', error));

  fetch('/requests/count')
  .then(response => response.json())
  .then(data => updateReqCount(data))
  .catch(error => console.error('error fetching the requests count', error));
});

// dinamically create table with the database retreived data
function createTableReq(data){
  const tableBody = document.getElementById('request-table-body');
  tableBody.innerHTML = '';
  data.forEach(request =>{
    const reqRow = document.createElement('tr');
    const shortDate = new Date(request.reqDate).toLocaleDateString();//display only date part
    reqRow.innerHTML = 
    `<td>${request.id}</td>
    <td>${request.userName}</td>
    <td>${request.userEmail}</td>
    <td>${request.reqSubject}</td>
    <td>${shortDate}</td>`;
    tableBody.appendChild(reqRow);
  });
}
// request count logic
function updateReqCount(data){
  const newReqCount = document.getElementById('req-count');
  newReqCount.textContent= `(${data.requestCount})`;
}

