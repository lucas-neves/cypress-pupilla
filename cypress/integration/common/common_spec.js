Given('que acesso a landing page', () => {
    cy.visit('/')
    cy.title().should('eq', 'Pupilla - Feito de médico para médico')
    cy.location('protocol').should('eq', 'https:')
    cy.contains('div', 'Aprenda e se atualize com experts da comunidade médica')
});

And('realizo login com o médico', () => {
    cy.SignIn()
});

Then('devo ter acesso à área logada', () => {
    cy.contains('Consultas Realizadas', { timeout: 10000 }).should('be.visible')
    cy.url().should('contain', '/app')
});

Then('recebo a mensagem {string} e clico em {string}', (mensagem, botao) => {
    cy.get('.content').contains(mensagem).should('be.visible')
    cy.contains(botao).click()
    cy.contains(mensagem).should('not.exist')
}); 