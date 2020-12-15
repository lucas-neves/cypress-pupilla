Cypress.Commands.add("SignIn", () => {
  cy.contains('Entrar').should('be.visible');
  cy.contains('Entrar').click()
  cy.get('form').within(() => {
    cy.get('input[type="email"]').type(Cypress.config('userDoctor'))
    cy.get('input[type="password"]').type(Cypress.config('password'))
    cy.xpath('//button/div[text()="Entrar"]').click()
  })
})

Cypress.Commands.add("AssertFlashMessage", (text) => {
  cy.get('div[class^="flash-message"] p').should('have.text', text)
})

Cypress.Commands.add("GetItemList", () => {
  return cy.get('div[class$="-menu"] > div > div')
})

Cypress.Commands.add("ClickItemList", (item) => {
  cy.GetItemList().each(($el, index, $list) => {
    if ($el.text().includes(item) || index === item) {
      $el.click()
    }
  }).then(($list) => {
    expect($list).to.have.length.at.least(1)
  })
})

Cypress.Commands.add('randomUser', () => {
  cy.request('https://api.mockaroo.com/api/b974def0?count=1&key=e39efef0').then((response) => {
    cy.writeFile('cypress/fixtures/random-user.json', response.body)
  })
})

Cypress.Commands.add('postUserLogin', (cpf) => {
  cy.request({
    method: 'POST',
    url: Cypress.config('baseApiUrl') + '/v1/login',
    headers: ({ client: Cypress.config('clientId') }),
    body: {
      "login": cpf,
      "password": Cypress.config('password')
    }
  }).then((resp) => {
    return resp.body.accessToken
  })
})

Cypress.Commands.add('getPatientId', (doctorCpf, patientCpf) => {
  cy.postUserLogin(doctorCpf).then((token) => {
    cy.request({
      method: 'GET',
      url: Cypress.config('baseApiUrl') + '/v1/patients/' + patientCpf,
      headers: { 'Authorization': 'Bearer ' + token,
      'client': Cypress.config('clientId') }
    }).then((resp) => {
      return resp
    })
  })
})

Cypress.Commands.add('putPatientEdit', (doctorCpf, patientCpf) => {
  cy.getPatientId(doctorCpf, patientCpf).then((resp) => {
    cy.request({
      method: 'PUT',
      url: Cypress.config('baseApiUrl') + '/v1/patients',
      headers: { 'Authorization': resp.requestHeaders.Authorization,
      'client': Cypress.config('clientId') },
      body: {
        "id": resp.body.id,
        "uf": null,
        "optins":["true", Cypress.config('userDoctor')],
	      "cardNumber": null
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})

Cypress.Commands.add('forceVisitEmail', profile => {
  cy.window().then(win => {
      return win.open(`https://preview.putsbox.com/p/${profile}pupilla/last`, '_self'); 
  });
});