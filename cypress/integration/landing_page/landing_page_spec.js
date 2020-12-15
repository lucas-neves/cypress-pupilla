import HomePage from '../../pages/HomePage';
import LandingPage from '../../pages/LandingPage';
const faker = require('faker/locale/pt_BR');

Then('devo visualizar os botões', (datatable) => { 
  datatable.hashes().forEach(element => {
    cy.get('#root').contains(element.buttonText)
  })
});

When('preencho os campos obrigatórios do cadastro de médico', () => {
  cy.wait(2000)
  cy.contains('Criar conta grátis').click({force: true})
  LandingPage.formRegistration().should('be.visible')
  // Validação de mensagens de obrigatoriedade
  cy.contains('Cadastrar').click()
  cy.xpath('//div[text()="Campo obrigatório"]').should('have.length', 3)

  // Validação das mensagens de campos inválidos
  LandingPage.typeName('nome')
  LandingPage.typeEmail('emailinvalido')
  LandingPage.typePassword('a')
  cy.contains('Cadastrar').click()
  LandingPage.formRegistration().should('contain.text', 'Digite nome e sobrenome')
  LandingPage.formRegistration().should('contain.text', 'O e-mail é inválido')
  LandingPage.formRegistration().should('contain.text', 'A senha deve conter pelo menos 1 letra e 1 número')
  LandingPage.typePassword('a1')
  cy.contains('Cadastrar').click()
  LandingPage.formRegistration().should('contain.text', 'Mínimo de 6 caracteres')

  // Preenchimento correto
  let name = faker.name.findName()
  console.log(name)
  LandingPage.typeName(name + ' QA')
  LandingPage.typeEmail(faker.internet.email(name, '', 'medico.qa'))
  LandingPage.typePassword('Teste123')
  cy.contains('Cadastrar').click()
});

And('seleciono as áreas de interesse', (datatable) => { 
  HomePage.formInterests().within(() => {
    datatable.hashes().forEach(element => {
      cy.xpath(`//label[text()='${element.Interesse}']`).click()
    })
    cy.contains('Salvar').click()
  })
});

Then('valido o cadastro com sucesso', () => {
  cy.AssertFlashMessage('Interesses atualizados!')
});

When('solicito a redefinição da senha', () => {
  cy.contains('Entrar').should('be.visible');
  cy.contains('Entrar').click()
  cy.contains('Esqueceu a senha?').click()
  LandingPage.typeEmail(Cypress.config('userDoctor'))
  cy.contains('Enviar').click()
});

Then('valido o e-mail e altero a senha do perfil {string}', (string) => {
  cy.AssertFlashMessage('Um e-mail foi enviado com instruções de como recuperar sua senha.')
  cy.forceVisitEmail('medico')
  cy.contains('p', 'Vimos que você esqueceu sua senha e estamos aqui para ajudar').should('be.visible');
  cy.contains('Quero recuperar minha senha!').click({force: true})
  LandingPage.typePassword(Cypress.config('password'))
  cy.wait(1000)
  cy.get('[type="submit"]').click({force: true})
  cy.AssertFlashMessage('Sua senha foi alterada com sucesso! Você já pode usá-la para acessar a sua conta.')
});

Then('faço uma busca pela palavra-chave {string} e valido o retorno', (string) => {
  cy.url().should('eq', Cypress.config('urlFaq'))
  LandingPage.inputSearchQuestion().type(string)
  LandingPage.questionsFAQ().then(listing => {
    expect(listing).to.have.length(1)
    expect(listing).to.contain(string.toLowerCase())    
  })
  LandingPage.questionsFAQ().find('img').click()
  LandingPage.questionsFAQ().find('p').should('be.visible')
});