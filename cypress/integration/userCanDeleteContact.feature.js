describe('create a contact', () => {
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
    it('delete a contact', () => {
        cy.wait(3000)
        cy.get('#trash').click()
        cy.contains('jenny@scherr.se').should('not.exist')
    })
})
