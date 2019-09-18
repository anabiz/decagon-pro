const DATABASE_URI = 'http://localhost:3000/freelance';
let EDIT_CONTACT;

const form = document.querySelector('form');
const submitNewContact = document.querySelector('#submit-new-contact');
const submitEditedContact = document.querySelector('#submit-edited-contact');
submitEditedContact.style.display = 'hidden';

// get data from our backend
const getcontact = async () => {
  const response = await fetch(DATABASE_URI);
  const contacts = await response.json();
  populateContacts(contacts);
};

  // get data and populate our page with data
const populateContacts = contacts => {
    const formatedContacts = contacts.map(formatContact);
    const displayContacts = document.querySelector('.display-freelancers');
  
    displayContacts.innerHTML += formatedContacts.join('');
  };

// get single contact data and formate it
const formatContact = contact => {
    const { name, job, country, charge, profile } = contact;
    return `
    <div class='contact' data-contact=${JSON.stringify(contact)}>
        <div> ${name} ${job} ${country} ${charge} </div>
        <div> ${profile}</div>
        <div class='edit-contact'>
              <button id='edit'>Edit</button>
              <button id='delete'>Delete</button>
        </div>
    </div>
    `;
  };
  


