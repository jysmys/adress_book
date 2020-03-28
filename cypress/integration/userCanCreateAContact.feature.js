describe('user can create a contact', () => {
	it('test', () => {
        cy.visit('http://localhost:3001')
		cy.get('#name').type('Jenny')
		cy.get('#email').type('jenny@scherr.se')
		cy.get('#phone').type('0767 687974')
		cy.get('#company').type('Performance IT')
		cy.get('#notes').type('Performance Engineer')
		cy.get('#twitter').type('@jennyscherr')
        // cy.get('#add-contact').click()
        cy.get('#submit').click()
    })
    it('displays a name of the new contact', () => {
		cy.get('#body').should('contain', 'Jenny')
	})
	
	it('displays the phone number of the new contact', () => {
		cy.get('#body').should('contain', '0767 687974')
	})
})