const DATABASE_URL ="http://localhost:3000/freelance";
const getcontact = async()=>{
    const response=await fetch(DATABASE_URL);
    const contact =await response.json();
    console.log(contact);
    populatecontact(contact);
};

const populatecontact = contact=>{
    formatactedcontacts = contact.map(formatactcontacts);
    const displaycontact = document.querySelector('.display-freelancers');
    displaycontact.innerHTML+=formatactedcontacts.json();
};

const formatecontacts=({name,job,country,charge,profile})=>{
   return '<div class="contact"><div>${name}${job}${charge}${profile}<div/><div/>';
         };
$(document).ready(getcontact)