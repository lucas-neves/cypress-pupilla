const FORM_REGISTER = 'div[class^="signup"] form'
const SELECT_SPECIALTY = 'div.select__value-container'
// Register Doctor
const INPUT_NAME = 'input[type="name"]'
const INPUT_EMAIL = 'input[type="email"]'
const INPUT_PASSWORD = 'input[type="password"]'
const BTN_ENTRAR = '//button/div[text()="Entrar"]'

class LandingPage {
    
    static formRegistration() {
        return cy.get(FORM_REGISTER)
    }
    static typeName(name) {
        cy.get(INPUT_NAME).clear().type(name)
    }
    static typeEmail(email) {
        cy.get(INPUT_EMAIL).clear().type(email)
    }
    static typePassword(password) {
        cy.get(INPUT_PASSWORD).clear().type(password)
    }
    static btnEntrar() {
        return cy.get(BTN_ENTRAR)
    }
}
export default LandingPage;