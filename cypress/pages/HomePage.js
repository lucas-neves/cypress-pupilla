const FORM_INTERESTS = 'div[class^="loading"] form'
const INPUT_SEARCH = 'input[placeholder="Busque por assunto"]'
const MENUS_HEADER = 'div[class^="dropdowncomponentstyle"] button'

class HomePage {

    static formInterests() {
        return cy.get(FORM_INTERESTS)
    }
    static typeSearchField(term) {
        cy.get(INPUT_SEARCH).clear().type(term)
    }
}
export default HomePage;