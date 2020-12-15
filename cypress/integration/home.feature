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
