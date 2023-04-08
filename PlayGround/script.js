// User can add a contact with name and mobile number(Duplicate mobile number not allowed)
// b.	Can view list of all contacts in ascending order of name.
//        •	Can filter records with name.
//        •	Can filter records with mobile number.
//        •	Filtering should be phrase search, Ex Deepak can be search by typing only De or Dep).
// c.	Can edit a contact.
// d.	Can delete a contact.

const addBtn = document.getElementById("add-btn");
const cancelBtn = document.getElementById("cancel-btn");
const deleteBtn = document.getElementById("delete-btn");
const editBtn = document.getElementById("edit-btn");
const recordList = document.querySelector(".record-container");

const person = document.getElementById("name");
const number = document.getElementById("contact");

let ContactArray = [];
let id = 0;

// Object constructor for Contact
function Contact(id, person, number){
  this.id = id;
  this.person = person;
  this.number = number;
};

//Display pre-exisiting records
document.addEventListener("DOMContentLoaded", function(){
 if(localStorage.getItem('contacts') === null){
  ContactArray = [];
 } else {
  ContactArray = JSON.parse(localStorage.getItem('contacts'));
 }

  displayContact();
});

//Display Contact
function displayContact() {
  ContactArray.forEach(function(singleContact) {
    addToContact(singleContact);
  });
}

//add contact
function addToContact(item) {
  const newRecordDiv = document.createElement("div");
  newRecordDiv.classList.add("record-item");
  newRecordDiv.innerHTML = 
    `<div class="record-el">
        <span id="labelling">Contact ID: </span>
        <span id="contact-id-content">${item.id}</span>
    </div>
    <div class="record-el">
        <span id="labelling">Name: </span>
        <span id="name-content">${item.person}</span>
    </div>
    <div class="record-el">
        <span id="labelling">Contact Number: </span>
        <span id="contact-num-content">${item.number}</span>
    </div>
    <button type="button" id="delete-btn"> Delete </button>
    <button type="button" id="edit-btn"> Edit </button>`;

    recordList.appendChild(newRecordDiv);
}

//making add btn functional
addBtn.addEventListener('click', function(){
  if(checkInput([person,number])){
    id++;
    const contact = new Contact(id, person.value, number.value);
    ContactArray.push(contact);
    localStorage.setItem('contacts', JSON.stringify(ContactArray));
    clearInputFields();

    addToContact(contact);
    alert("Contact added");
  } else {
    alert("Contact can't be added");
    return false;
  }
});

//input validation
function checkInput(arr){
  for(let i = 0; i < arr.length; i++){
    if(arr[i].value === ""){
      return false;
    } 
  }
  return true;
}

//clearing all input fields
cancelBtn.addEventListener('click', function(){
  clearInputFields();
});

function clearInputFields(){
  person.value="";
  number.value="";
}

recordList.addEventListener('click', function(event){
  if(event.target.id === "delete-btn"){
    let recordItem = event.target.parentElement;
    recordList.removeChild(recordItem);
    let tempContactList = ContactArray.filter(function(record){
        return (record.id !== parseInt(recordItem.firstElementChild.lastElementChild.textContent));
    });
    ContactArray = tempContactList;
    //removing from localstorage by overwriting
    localStorage.setItem('contacts', JSON.stringify(ContactArray));
  }
});

editBtn.addEventListener('click', function(){
  let idx = prompt("Which contact (by number) do you wish to edit?");
  
  // Did user enter a valid index?
  if(ContactArray[idx-1]){
    let newNumber = prompt("What is the new last name?");
    ContactArray[idx-1]["Contact Number"] = newNumber;      // Update address book
  } else { alert("That's not a valid index!"); }
  displayContacts(ContactArray);
});