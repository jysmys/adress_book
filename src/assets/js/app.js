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
    <th></th>
    <th></th>
    `
    table.appendChild(head)
}
const tableEnd = table => {
    let tend = document.createElement('tr')
    tend.setAttribute('id', 'tend')
    tend.innerHTML = `<td></td><td></td><td></td><td></td><td></td>`
    table.appendChild(tend)
}

const renderContacts = () => {
  const contacts = JSON.parse(storage.getItem('contacts'))
  let table = document.querySelector('#contact-list')
  table.innerHTML = ''
  tableHeader(table)

  if (contacts) {
	contacts.forEach(contact => {
        let tr = document.createElement('tr')
        tr.setAttribute('id', 'body')
        tr.setAttribute('name', `${contact.id}`)

        tr.innerHTML = `
        <td><p>${contact.name}</p></td>
        <td><p>${contact.email}</p></td>
        <td><p>${contact.phone}</p></td>
        <td><p>${contact.company}</p></td>
        <td><p>${contact.notes}</p></td>
        <td><p><a id="edit" onClick="editItem(this,${contact.id})"><svg class="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"/>
        <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"/>
      </svg></a></p></td>
        <td><p><a id="trash" onClick="removeItem(this,${contact.id})"><i class="glyphicon glyphicon-trash"></i></></p></td>
        `
        table.appendChild(tr)
        }
    )
	} else {
        table.innerHTML = '<tr><td><p>You have no contacts in your address book</p></td></tr>'
    }
    tableEnd(table)
}
const saveContacts = contacts => {
    storage.setItem('contacts', JSON.stringify(contacts))
    renderContacts()
}

document.addEventListener('DOMContentLoaded', () => {
    renderContacts()
    const  contactForm = document.getElementById('new-contact-form')
    
    const  toggleFormVisibilityButton = document.getElementById('add-contact')
	contactForm.style.display = 'none'
    
	toggleFormVisibilityButton.addEventListener('click', () => {
        if (contactForm.style.display === '') {
            contactForm.style.display = 'none'
            document.getElementById("add-contact").disabled = false;
		} else {
            contactForm.style.display = ''
            document.getElementById("add-contact").disabled = true;
		}
    })
    
    const buttonClick = document.getElementById('submit')
    let  contacts = JSON.parse(storage.getItem('contacts')) || []
    buttonClick.addEventListener('click', event  => {
        event.preventDefault()
        contactForm.style.display = 'none'
        document.getElementById("add-contact").disabled = false;
        const existingId = document.getElementById('id').value
        
        if (parseInt(existingId) >= 1) {
            const { name, email, phone, company, notes, twitter,  id} = contactForm.elements

            const index = document.getElementById('id').value
            const ixd = parseInt(index)

            contacts[ixd].name = name.value,
            contacts[ixd].email = email.value,
            contacts[ixd].phone = phone.value,
            contacts[ixd].company = company.value,
            contacts[ixd].notes = notes.value,
            contacts[ixd].twitter = twitter.value,
            contacts[ixd].id = id.value

        storage.setItem('contacts', JSON.stringify(contacts))
        renderContacts()
        }
        else {
            const { name, email, phone, company, notes, twitter} = contactForm.elements
            const i = contacts.length

            const contact = {
                name:  name.value,
                email:  email.value,
                phone:  phone.value,
                company:  company.value,
                notes:  notes.value,
                twitter:  twitter.value,
                id: i
            }
            console.log(contact)
            contacts.push(contact)
            storage.setItem('contacts', JSON.stringify(contacts))
            renderContacts()
        }
        contactForm.reset()
   })

})

const removeItem = (i, ids) => {
    const  contacts = JSON.parse(storage.getItem('contacts'))
    const newContacts = contacts.filter(item => parseInt(item.id) !== ids)
    saveContacts(newContacts)
}

const editItem = (i, ids) => {
    document.getElementById('new-contact-form').style.display = ''
    const  contacts = JSON.parse(storage.getItem('contacts'))
        
    contacts.forEach(items => {
        if (items.id == ids) {
            const objIndex = contacts.findIndex((obj => obj.id == ids))
            // document.getElementById("hiddenIndex").value = objIndex
            document.getElementById("name").value = contacts[objIndex].name
            document.getElementById("email").value = contacts[objIndex].email
            document.getElementById("phone").value = contacts[objIndex].phone
            document.getElementById("company").value = contacts[objIndex].company
            document.getElementById("notes").value = contacts[objIndex].notes
            document.getElementById("id").value = contacts[objIndex].id
        }
    })
}