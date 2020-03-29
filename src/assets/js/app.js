const  storage = window.localStorage

const tableHeader = table => {
    let thead = document.createElement('tr')
    thead.setAttribute('id', 'thead')
    thead.innerHTML = `
    <th>Your Contacts</th>
    <th></th>
    <th></th>
    <th></th>
    <th></th>`
    table.appendChild(thead)

    let head = document.createElement('tr')
    head.setAttribute('id', 'head')
    head.innerHTML = `
    <th>Name</th>
    <th>Email</th>
    <th>Phone</th>
    <th>Company</th>
    <th>Notes</th>
    <th></th>`
    table.appendChild(head)
}
const tableEnd = table => {
    let tend = document.createElement('tr')
    tend.setAttribute('id', 'tend')
    tend.innerHTML = `<td></td><td></td><td></td><td></td><td></td>`
    table.appendChild(tend)
}
// const isEmpty = contact =>{
//     return contact.every((k,v) => v === "")
//   }

const  renderContacts = () => {
  const  contacts = JSON.parse(storage.getItem('contacts'))
  let table = document.querySelector('#contact-list')
  table.innerHTML = ''
  tableHeader(table)

  if (contacts) {
	contacts.forEach(contact  => {
        let  tr = document.createElement('tr')
        tr.setAttribute('id', 'body')
        tr.setAttribute('name', `${contact.id}`)

        tr.innerHTML = `
        <td><p>${contact.name}</p></td>
        <td><p>${contact.email}</p></td>
        <td><p>${contact.phone}</p></td>
        <td><p>${contact.company}</p></td>
        <td><p>${contact.notes}</p></td>
        <td><p><a onClick="removeItem(this,${contact.id})"><i class="glyphicon glyphicon-trash"></i></></p></td>
        `
        table.appendChild(tr)
        }
    )
	} else {
        table.innerHTML = '<tr><td><p>You have no contacts in your address book</p></td></tr>'
    }
    tableEnd(table)
}

document.addEventListener('DOMContentLoaded', () => {
    renderContacts()
    const  contactForm = document.getElementById('new-contact-form')
	const buttonClick = document.getElementById('submit')
	buttonClick.addEventListener('click', event  => {
        event.preventDefault()
        let  contacts = JSON.parse(storage.getItem('contacts')) || []
        let i = contacts.length + 1

		// 1. Read all the input fields and get their values
		const { name, email, phone, company, notes, twitter } = contactForm.elements
		const  contact = {
            id : i,
            name:  name.value,
			email:  email.value,
			phone:  phone.value,
			company:  company.value,
			notes:  notes.value,
			twitter:  twitter.value,
		}
		console.log(contact)
		contacts.push(contact)

		// 2. Save them to our storage
		storage.setItem('contacts', JSON.stringify(contacts))
		renderContacts()
		contactForm.reset()
   })
})

const removeItem = (i, ids) => {
    const  contacts = JSON.parse(storage.getItem('contacts'))
    const newContacts = contacts.filter((item) => item.id !== ids)
    storage.setItem('contacts', JSON.stringify(newContacts))
    renderContacts()
}