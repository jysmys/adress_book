describe('user can create a contact', () => {
    beforeEach('test', () => {
        cy.visit('http://localhost:3001')
        cy.get('#add-contact').click()
		cy.get('#name').type('Jenny')
		cy.get('#email').type('jenny@scherr.se')
		cy.get('#phone').type('0767 687974')
		cy.get('#company').type('Performance IT')
		cy.get('#notes').type('Performance Engineer')
		cy.get('#twitter').type('@jennyscherr')
        cy.get('#submit').click()
        cy.get('#contact-list')
    })
    it('displays a new contact', () => {
        cy.get('#contact-list')
        .should('contain', 'Jenny')
		.should('contain', '0767 687974')
	})
})
