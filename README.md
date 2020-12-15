# Exemplo para execução

```
npm install
npm test
```  

# Uso de Tags

### Tagging tests
Você pode usar tags para selecionar qual teste deve ser executado usando [cucumber's tag expressions](https://github.com/cucumber/cucumber/tree/master/tag-expressions).
Lembre-se de que estamos usando uma sintaxe mais recente, por exemplo. `'not @foo and (@bar or @zap)'`.
Para inicializar testes usando tags, você precisará executar o cypress e passar a variável de ambiente TAGS.

Para tornar as coisas mais rápidas e pular o cypress, abrindo um navegador para cada arquivo de recurso (levando alguns segundos para cada um), mesmo os que queremos que sejam ignorados, usamos o próprio aplicativo Cypress. Ele passa todos os argumentos para o cypress; portanto, use-o da mesma maneira que usaria o cypress CLI. A única diferença é que primeiro filtrará os arquivos com os quais não nos importamos, com base nas tags fornecidas.

### Examples:

Existem alguns testes 'tagueados' nesses arquivos:

[home.feature](https://github.com/lucasn580/cypress-pupilla/tree/master/cypress/integration/home.feature)
```
@pupilla
@home
Feature: Home médico (logado)

  I quero validar os agendamentos de consulta novos e antigos

  Background: Login
    Given que acesso a landing page
    And realizo login com o médico
  
  @home01
  Scenario: Validação da área logada    
    Then devo ter acesso à área logada

```

[landing_page.feature](https://github.com/lucasn580/cypress-pupilla/tree/master/cypress/integration/landing_page.feature)
```
@pupilla
@landingpage
Funcionalidade: Landing Page

  I quero validar a landing page e suas funcionalidades

  Background: 
    Given que acesso a landing page
  
  @landingpage01
  Scenario: Validação dos botões de login e cadastro
    Then devo visualizar os botões
      | buttonText            |
      | Entrar                |
      | Criar conta grátis    |
      | Criar conta grátis *  |
      | Cadastrar             |
```

###### Exemplo simples
  Execute ```npx cypress-tags run -e TAGS='@pupilla'```. Como `home.feature` e `landing_page.feature` têm `@pupilla` marcados, o resultado deve ser: 
  
  ```
      Spec                                       Tests  Passing  Failing  Pending  Skipped
  ┌─────────────────────────────────────────────────────────────────────────────────────────┐
  │ ✔ home.feature                   00:04        2        2        -        -        -     │
  ├─────────────────────────────────────────────────────────────────────────────────────────┤
  │ ✔ landing_page.feature           00:05        2        2        -        -        -     │
  └─────────────────────────────────────────────────────────────────────────────────────────┘
    All specs passed!                00:09        4        4        -        -        -
```

###### Uso do `not`

Execute ```npx cypress-tags run -e TAGS='not @landingpage'```. `landing_page.feature` vai executar, como apenas `landing_page.feature` têm a tag apontada, o resultado deve ser: 

```
      Spec                                      Tests  Passing  Failing  Pending  Skipped
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ ✔ landing_page.feature           00:05        2        2        -        -        -            │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
    All specs passed!                00:05        2        2        -        -        -
```

###### Uso do `and` 

Execute ```npx cypress-tags run -e TAGS='@pupilla and @landingpage01'``` neste repositório. Existe apenas um cenário que possui as duas tags, em `landing_page.feature`. O resultado deve ser:  

```
     Spec                                       Tests  Passing  Failing  Pending  Skipped
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ ✔ landing_page.feature          00:03        1        1        -        -        -             │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
    All specs passed!               00:03        1        1        -        -        -

```

###### Combinações

Lembre-se de que a ordem é importante e use parênteses com sabedoria. Os seguintes comandos produzirão resultados diferentes:
```npx cypress-tags run -e TAGS='@tag-executar or @outra-tag-executar and not @outra-tag-qualquer'```

```npx cypress-tags run run -e TAGS='(@tag-executar or @outra-tag-executar) and not @outra-tag-qualquer'```

### Tag inteligente
Inicie seus testes sem definir nenhuma tag. E, em seguida, coloque um @focus no cenário (ou cenários) em que você deseja focar durante o desenvolvimento ou a correção de erros.

For example:
```gherkin
Feature: Smart Tagging

  As o plugin do cucumber cypress que trabalha com tags
  I quero que coloque tag no cenário em que deseja focar
  So que possa trabalhar com mais eficiência e ter um ciclo de feedback mais curto

  Scenario: Esse cenário não deve executar se @focus estiver em outro cenário
    Then este cenário desfocado não deve executar

  @focus
  Scenario: Este cenário está com foco e deve executar
    Then este cenário focado deve executar

  @essa-tag-nao-tera-efeito
  Scenario: Este cenário também não deve executar
    Then este cenário desfocado não deve executar

  @focus
  Scenario: Este cenário também está com foco e também deve executar
    Then este cenário focado deve executar
```
