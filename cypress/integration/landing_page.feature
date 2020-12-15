@pupilla
@landingpage
Feature: Landing Page

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

  @landingpage02
  Scenario: Cadastro de médico válido
    When preencho os campos obrigatórios do cadastro de médico
    And seleciono as áreas de interesse
      | Interesse             |
      | Arritmia              |
      | Cardiologia geral     |
      | Musculoesquelético    |
      | Medicina Intensiva    |
    Then valido o cadastro com sucesso

  @landingpage03
  Scenario: Alteração de senha
    When solicito a redefinição da senha
    Then valido o e-mail e altero a senha do perfil 'medico'
