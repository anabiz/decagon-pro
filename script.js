const DATABASE_URI = 'http://localhost:3000/freelance';
let EDIT_CONTACT;

const form = document.querySelector('form');
const submitNewContact = document.querySelector('#submit-new-contact');
const submitEditedContact = document.querySelector('#submit-edited-contact');
submitEditedContact.style.display = 'hidden';

// get data from our backend
const getContact = async () => {
  const response = await fetch(DATABASE_URI);
  const contacts = await response.json();
  populateContacts(contacts);

  // get button actions from page and register event listeners
  const editContacts = document.querySelectorAll('#edit');

  const deleteContacts = document.querySelectorAll('#delete');

  // register button actions
  editContacts.forEach(button =>
    button.addEventListener('click', ({ path }) => {
      console.log(path);
      submitNewContact.style.display = 'none';
      submitEditedContact.style.display = 'unset';

      const contact = JSON.parse(path[2].dataset.contact);
      console.log(contact);
      for (const key in form.elements) {
        const inputElement = form.elements[key];
        inputElement.value = contact[inputElement.name];
      }

      EDIT_CONTACT = contact;
    })
  );

  deleteContacts.forEach(button =>
    button.addEventListener('click', async ({ path }) => {
      const contact = path[2];
      const { id } = JSON.parse(path[2].dataset.contact);
      contact.remove();

      await fetch(`${DATABASE_URI}/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
    })
  );
};

// get data and populate our page with data
const populateContacts = contacts => {
  const formatedContacts = contacts.map(formatContact);
  const displayContacts = document.querySelector('.display-freelancers');

  displayContacts.innerHTML += formatedContacts.join('');
};

// get single contact data and formate it
const formatContact = contact => {
  const { firstName, lastName, phone } = contact;
  return `
  <div class='contact col-sm-4' style='text-align: center;border-radius: 25px;
  border: 2px solid #73AD21;
  padding: 20px; 
  width: 200px;
  height: 150px,margin: 25px' data-contact=${JSON.stringify(contact)}>
      <div> ${firstName}</div><div> ${lastName}</div>
      <div > ${phone}</div>
      <div class='edit-contact'>
            <button id='edit'>Edit </button>
            <button id='delete' style="margin-bottom:50px">Delete</button>
      </div>
  </div>
  `;
};

submitNewContact.addEventListener('click', async () => {
  event.preventDefault();
  const contact = {};

  for (const key in form.elements) {
    if (form.elements.hasOwnProperty(key)) {
      const inputElement = form.elements[key];
      if (inputElement['name'] && inputElement.value) {
        contact[inputElement['name']] = inputElement.value;
      }
    }
  }

  if (!Object.values(contact).length) return;

  const response = await fetch(DATABASE_URI, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...contact })
  });

  await response.json();
});

submitEditedContact.addEventListener('click', async () => {
  event.preventDefault();
  submitNewContact.style.display = 'unset';

  const contact = {};

  for (const key in form.elements) {
    if (form.elements.hasOwnProperty(key)) {
      const inputElement = form.elements[key];
      if (inputElement['name'] && inputElement.value) {
        contact[inputElement['name']] = inputElement.value;
      }
    }
  }

  if (!Object.values(contact).length) return;

  const response = await fetch(`${DATABASE_URI}/${EDIT_CONTACT.id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...contact })
  });

  await response.json();
});


function myfunction() {
  var x = document.getElementById("form");
  if (x.style.display === "none") {
    x.style.display = "block";
  }else{
    x.style.display = "none";
  }
}
$(document).ready(getContact);