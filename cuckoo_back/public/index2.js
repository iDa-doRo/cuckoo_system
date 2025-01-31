// General site logic
document.addEventListener('DOMContentLoaded', function(){
 const cuckooTableBody = document.getElementById("cuckooTableBody");
 const editModal = document.getElementById("editModal");
 const closeModal = document.getElementById("closeEdit");
 const editForm = document.getElementById("editForm");
 const currentPic = document.getElementById("currentPic");
 const deleteModal = document.getElementById("deleteModal");
 const closeDelete = document.getElementById("closeDelete");
 const confirmDelete = document.getElementById("confirmDelete");
 const cancelDelete = document.getElementById("cancelDelete");
 
 let cuckooIdToDelete = null;
 let currentCuckoo = null;

 function fetchCuckoos() {
  cuckooTableBody.innerHTML = '';
 fetch('/content/getAll')
 .then(response => response.json())
 .then(data => {
  data.forEach(cuckoo => {
    console.log('cuckoo:', cuckoo);
    const createDate = new Date(cuckoo.created_at);
    const updateDate = new Date(cuckoo.updated_at);

    const updateDisplay = (createDate.getTime() === updateDate.getTime()) ? '': updateDate.toLocaleDateString('en-GB');

    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${cuckoo.id}</td>
    <td>${cuckoo.cuckooName}</td>
    <td>${cuckoo.cuckooStatus}</td>
    <td>${cuckoo.cuckooPrice}</td>
    <td>${createDate.toLocaleDateString('en-GB')}</td>
    <td>${updateDisplay}</td>
    <td><button class="deleteCuckoo" data-id="${cuckoo.id}">Delete</button></td>`;

    row.addEventListener('click', () => {
      console.log('Row clicked:', cuckoo);
      currentCuckoo = cuckoo.id;
      document.getElementById("editName").value = cuckoo.cuckooName;
      document.getElementById("editDesc").value = cuckoo.cuckooDesc;
      document.getElementById("editStatus").value = cuckoo.cuckooStatus;

      if (cuckoo.cuckooPic && cuckoo.cuckooPic.type === 'Buffer') {
        const blob = new Blob([new Uint8Array(cuckoo.cuckooPic.data)], { type: 'image/jpeg'});
        const imageUrl = URL.createObjectURL(blob);
        currentPic.src = imageUrl;
        currentPic.style.display = 'block';
      } else {
        currentPic.style.display = 'none';
      }
       editModal.style.display = 'block';
  });
    cuckooTableBody.appendChild(row);
  });

  document.querySelectorAll('.deleteCuckoo').forEach(button => {
    button.addEventListener('click', function(event) {
      event.stopPropagation();
      const id = this.getAttribute('data-id');
      cuckooIdToDelete = id;
      deleteModal.style.display = 'block';
    });
  });
 });
}
if (cuckooTableBody) {
fetchCuckoos();
 }

 function deleteCuckoo(id) {
  fetch(`/content/delete/${id}`, {
    method: 'DELETE',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response not ok');
    }
    return response.text();
  })
    .then(data => {
      alert('Cuckoo deleted successfully');
      deleteModal.style.display = 'none';
      location.reload();
    })
    .catch(error => {
      console.error('Error deleting cuckoo:', error);
      alert('There was an error while trying to delete cuckoo');
      deleteModal.style.display = 'none';
    });
 }

 if (closeModal){
  closeModal.addEventListener('click', function() {
    editModal.style.display = "none";
  });
 }

 window.onclick = function(event) {
  if (event.target == editModal) {
    editModal.style.display = "none";
  }
  if (event.target == deleteModal) {
    deleteModal.style.display = "none";
  }
 }

 if (editForm) {
  editForm.addEventListener('submit', function(event){
    event.preventDefault();

    const formData = new FormData(editForm);
    formData.append('updated_at', new Date().toISOString().split('T')[0]);

    fetch(`/content/update/${currentCuckoo}`, {
      method: 'PUT',
      body: formData
    })
    .then(response => response.text())
    .then(data => {
      alert('Cuckoo updated successfully');
      editModal.style.display = 'none';
      location.reload();
    })
    .catch(error => console.error('Error while updating cuckoo:', error));
  });
 }

 if (confirmDelete) {
  confirmDelete.addEventListener('click', function() {
    if (cuckooIdToDelete) {
      deleteCuckoo(cuckooIdToDelete);
    }
  });
}
 if (cancelDelete) {
  cancelDelete.addEventListener('click', function() {
    deleteModal.style.display = 'none';
  });
 }
 if (closeDelete) {
  closeDelete.addEventListener('click', function() {
    deleteModal.style.display = 'none';
  });
 }

 function addNewCuckoo() {
  window.location.href = 'addCuckoo.html';
 }
 if (cuckooTableBody) {
  document.getElementById("addNew").addEventListener('click', addNewCuckoo);
 }

if (window.location.pathname.endsWith('addCuckoo.html')) {
  const addCuckooForm = document.getElementById("addCuckooForm");

  document.getElementById("cancelPost").addEventListener('click', () => {
    if (confirm("You are about to discard the post. Are you sure?")) {
    window.location.href = 'content.html';
  }
});

addCuckooForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(addCuckooForm);

  formData.forEach((value, key) => {
    console.log(key, value);
  });

  formData.append('cuckooName', formData.get('cuckooTitle'));
  formData.append('cuckooDesc', formData.get('description'));
  formData.append('cuckooStatus', formData.get('status'));
  formData.append('cuckooPrice', formData.get('price'));
  formData.append('restorer_id', formData.get('restorer_id'));

fetch('/content/add', {
  method: 'POST',
  body: formData
})
.then (response => {
  if (!response.ok) {
    throw new Error('Network response not ok');
  }
  return response.text();
})

.then(data => {
  alert('Successfully posted to public site.');
  window.location.href = 'content.html';
})
.catch(error => {
  console.error('Error fetching cukoo form data:', error);
});
});
}

  //Search nav bar 
  var searchInput = document.querySelector('.search-input');
  var searchButton = document.querySelector('.search-button');
  if (searchInput && searchButton){
  searchButton.addEventListener('click', function (event){
    if(document.activeElement !== searchInput) {
      event.preventDefault();
      searchInput.focus();
    }
  });
}

// Requests page logic
// logic to go back to dashboard usign the logo
var adminLogo = document.getElementById('admin-logo');
if (adminLogo){
  adminLogo.addEventListener('click', function(){
    window.location.href = 'dashboard.html'
  });
}

// logic to access content page
var content = document.getElementById('cuckoo-clocks');
if(content) {
  content.addEventListener('click', function(){
    window.location.href = 'content.html'
  });
}

// logic to access admin requests page
var requestsDash = document.getElementById('requests-dash');
if (requestsDash){
  requestsDash.addEventListener('click', function(){
    window.location.href = 'adminReq.html'
  });
}

// requests table logic
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
  var newRequest = document.getElementById('new-request');
  if (newRequest) {
  newRequest.addEventListener('click', fetchNew);
  }
  // event listener for all requests filtering button
  var allRequest = document.getElementById('all-request');
  if (allRequest) {
    allRequest.addEventListener('click', fetchAll);
  }
  // event listener for request detail
  if (document.getElementById('req-details-section')) {
    const urlParam = new URLSearchParams(window.location.search);
    const requestID = urlParam.get('id');
    if (requestID){
      fetch(`/requests/${requestID}`)
      .then(response => response.json())
      .then(data => requestDetails(data))
      .catch(error => console.error('error fetching request details', error));
    }
     var nowButton = document.getElementById('now');
     if (nowButton){
      nowButton.addEventListener('click',
      handleNow);
    }
    var laterButton = document.getElementById('later');
    if (laterButton){
      laterButton.addEventListener('click', () => {
      handleLater(requestID);
      });
    }
    var sendButton = document.getElementById('send');
    if (sendButton) {
      sendButton.addEventListener('click', () => {
      sendResponse(requestID);   
    }); 
  }
    var closeButton = document.querySelector('.close');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        var messageW = document.getElementById('warning');
        if (messageW){
          messageW.classList.add('hidden');
          messageW.classList.remove('visible');
          window.location.href = 'adminReq.html';
        }
    });
  }
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
    `<td><a href="adminReqDetail.html?id=${request.id}" aria-label="Request ID ${request.id}">${request.id}</a></td>
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

// Request details logic
// Function to fill up request details
function requestDetails(data) {
  console.log('Request details', data); //debbuging line
  document.getElementById('req-id').textContent = data.id;
  document.getElementById('req-id-h').textContent = data.id;
  document.getElementById('req-user').textContent = data.userName;
  document.getElementById('req-subject').textContent = data.reqSubject;
  document.getElementById('req-date').textContent = new Date(data.reqDate).toLocaleDateString();
  document.getElementById('req-message').textContent = data.reqMessage;

  const attachedContainer = document.getElementById('pics-container');
  const attachedPics = document.getElementById('pictures');
  if(data.reqPics) {
    attachedContainer.classList.remove('hidden');
    const picItem = document.createElement('img');
    picItem.src = `data:image/jpeg;base64,${data.reqPics}`;
    picItem.alt = 'Attached Picture';
    picItem.classList.add('thumbnail');
    attachedPics.appendChild(picItem);

    picItem.addEventListener('click', function() {
      openBigPic(this.src);
    });
  } else {
    attachedContainer.classList.add('hidden');
  }
}

function handleNow(){
  const responseShow = document.querySelector('.res-section');
  if (responseShow){
    responseShow.classList.remove('hidden');
    responseShow.classList.add('visible');
  }
  
}
function handleLater(requestID){
  showWarning(`Request ID:${requestID} successfully marked to answer later`);
}

function sendResponse(requestID) {
  showWarning(`Response to request ID:${requestID} successfully sent to user.`);
}
//show warning message depending on button pressed
function showWarning(message) {
  const warning = document.getElementById('warning');
  const warningMessage = document.getElementById('warning-message');
  if (warning && warningMessage){
    warningMessage.textContent = message;
    warning.classList.remove('hidden');
    warning.classList.add('visible');
    warning.style.display = 'block';
  }
}

//close warning message and redirect to request page
var closeWarning = document.querySelector('.warning modal .close');
if (closeWarning){
  closeWarning.addEventListener('clcik', function() {
    var modalWarning = document.getElementById('warning');
    if (modalWarning) {
      modalWarning.style.display = 'none';
    }
  });
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

// function to display the pictures in full size
function openBigPic(imageSrc){
  var modal = document.getElementById('modalDiv');
  var modalPic = document.getElementById('img01');
  var capText = document.getElementById('caption');
  console.log('Modal Elements:', modal, modalPic, capText);

  modal.style.display = 'block';
  modalPic.src = imageSrc;
  capText.innerHTML = 'Attached Picture';


  var xModal = document.getElementsByClassName('closeModal')[0];
  if (xModal){
    xModal.onclick = function() {
    modal.style.display = 'none';
  };
}
}
