describe('user can toggle visibility of the form', () => {

	before(() => {
		cy.visit('http://localhost:3001')
	})
	
	it('by clicking the "Add Contact" button', () => {
    cy.get('#new-contact-form').should('not.be.visible')
    cy.get('#add-contact').should('not.be.disabled')
	cy.get('#add-contact').click()
    cy.get('#new-contact-form').should('be.visible')
    cy.get('#add-contact').should('be.disabled')
    cy.get('#name').type('Jultomten kommer')
    cy.get('#submit').click()
	cy.get('#new-contact-form').should('not.be.visible')
	// cy.get('#add-contact').click()
	})
})