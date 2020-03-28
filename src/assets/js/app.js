const  storage = window.localStorage

const  renderContacts = () => {
  const  contacts = JSON.parse(storage.getItem('contacts'))

  let table = document.querySelector('#contact-list')
  if (contacts) {
	table.innerHTML = ''
	// document.createElement('table')
    
	contacts.forEach(contact  => {
        let  tr = document.createElement('tr')
		// let  td = document.createElement('td')

		tr.innerHTML = `
		  <td><p>${contact.name}</p></td>
		  <td><p>${contact.email}</p></td>
		  <td><p>${contact.phone}</p></td>
		  <td><p>${contact.company}</p></td>
		  <td><p>${contact.notes}</p></td>
	    `
	    table.appendChild(tr)
	  })
			
	//   table.appendChild(tr)
	} else {
        table.innerHTML = '<p>You have no contacts in your address book</p>'
	}
}

document.addEventListener('DOMContentLoaded', () => {
    renderContacts()
    const  contactForm = document.getElementById('new-contact-form')
	const buttonClick = document.getElementById('submit')
	buttonClick.addEventListener('click', event  => {
        event.preventDefault()

		// 1. Read all the input fields and get their values
		const { name, email, phone, company, notes, twitter } = contactForm.elements

		const  contact = {
			name:  name.value,
			email:  email.value,
			phone:  phone.value,
			company:  company.value,
			notes:  notes.value,
			twitter:  twitter.value,
		}

		console.log(contact)

		let  contacts = JSON.parse(storage.getItem('contacts')) || []

		contacts.push(contact)

		// 2. Save them to our storage
		storage.setItem('contacts', JSON.stringify(contacts))
		renderContacts()
		contactForm.reset()
   })
})