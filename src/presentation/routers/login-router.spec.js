import LoginRouter from './login-router'
import MissingParamError from '../helpers/missing-param-error'

// criamos um "helper" para criar uma instância da classe
// isso é um design pattern bem conhecido, é o factory
// entenda makeSut como uma fábrica que cria e retorna instâncias da classe LoginRouter()
// tudo que uma função retorna se torna público, porém podemos controlar o que se torna público e o que fica privado, definindo dentro da função o que ela deve retornar
// podemos atribuir a uma variável a constante makeSut e utilizar as instâncias
const makeSut = () => {
  // criamos a classe AuthUseCaseSpy, um mock para testes, é um mock do tipo spy, captura valores e faz comparações, para ficar didático acrescentamos a palavra spy no final do nome
  class AuthUseCaseSpy {
    // passamos email como parâmetro para auth
    auth (email, password) {
      // atribuímos email a uma variável interna de mesmo nome por meio do this
      this.email = email
      // atribuímos password a uma variável interna de mesmo nome por meio do this
      this.password = password
    }
  }
  // instanciamos a classe e injetamos ela em LoginRouter (design pattern dependency injection)
  // LoginRouter não sabe como gerar uma nova instância, ele recebe ela pronta pra usar
  const authUseCaseSpy = new AuthUseCaseSpy()
  // atribuímos a sut uma nova instância de LoginRouter passando como argumento authUserCaseSpy
  const sut = new LoginRouter(authUseCaseSpy)
  // agora exportamos um objeto contendo sut e authUserCaseSpy
  return {
    sut,
    authUseCaseSpy
  }
}

// definimos um teste unitário da rota de login
describe('Login Router', () => {
  // se uma senha não for enviada para a rota devemos retornar com um erro 400
  // o erro 400 é um bad request, um problema no client e não no server
  test('should return 400 if no password is provided', () => {
    // criamos uma nova instância da classe LoginRouter, que não existe ainda
    // esse é o conceito do TDD, primeiro criamos o teste para só depois criar o código
    // um padrão comum é chamar o objeto do teste como sut (system under test)
    const { sut } = makeSut()
    // queremos testar o método route da classe loginRouter
    // sabemos que route recebe um objeto chamado httprequest
    // como queremos testar especificamente a falta da senha, o body será preenchido apenas com o email
    const httpRequest = {
      body: {
        email: 'any_email@test.com'
      }
    }
    // sabemos também que route responde com um httpResponse
    const httpResponse = sut.route(httpRequest)
    // esperamos que o nosso httpResponse retorne status 400
    expect(httpResponse.statusCode).toBe(400)
    // esperamos também uma mensagem de erro correspondente a propriedade que está faltando por meio da da classe MissingParamError que instanciamos
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })
})

// definimos um teste unitário da rota de login
describe('Login Router', () => {
  // se uma senha não for enviada para a rota devemos retornar com um erro 400
  // o erro 400 é um bad request, um problema no client e não no server
  test('should return 400 if no email is provided', () => {
    // criamos uma nova instância da classe LoginRouter, que não existe ainda
    // esse é o conceito do TDD, primeiro criamos o teste para só depois criar o código
    // um padrão comum é chamar o objeto do teste como sut (system under test)
    const { sut } = makeSut()
    // queremos testar o método route da classe loginRouter
    // sabemos que route recebe um objeto chamado httprequest
    // como queremos testar especificamente a falta do email, o body será preenchido apenas com a senha
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    // sabemos também que route responde com um httpResponse
    const httpResponse = sut.route(httpRequest)
    // esperamos que o nosso httpResponse retorne status 400
    expect(httpResponse.statusCode).toBe(400)
    // esperamos também uma mensagem de erro correspondente a propriedade que está faltando por meio da da classe MissingParamError que instanciamos
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
})

// definimos um teste unitário da rota de login
describe('Login Router', () => {
  // se não recebermos um request devemos retornar com um erro 500
  // o erro 500 é um erro do server, é um erro do desenvolvedor
  test('should return 500 if no httpRequest is provided', () => {
    // criamos uma nova instância da classe LoginRouter, que não existe ainda
    // esse é o conceito do TDD, primeiro criamos o teste para só depois criar o código
    // um padrão comum é chamar o objeto do teste como sut (system under test)
    const { sut } = makeSut()
    // queremos testar o método route da classe loginRouter
    // sabemos que route recebe um objeto chamado httprequest, mas não passaremos o objeto para route
    // sabemos também que route responde com um httpResponse
    const httpResponse = sut.route()
    // esperamos que o nosso httpResponse retorne status 500
    expect(httpResponse.statusCode).toBe(500)
  })
})

// definimos um teste unitário da rota de login
describe('Login Router', () => {
  // se não recebermos um request devemos retornar com um erro 500
  // o erro 500 é um erro do server, é um erro do desenvolvedor
  test('should return 500 if httpRequest has no body', () => {
    // criamos uma nova instância da classe LoginRouter, que não existe ainda
    // esse é o conceito do TDD, primeiro criamos o teste para só depois criar o código
    // um padrão comum é chamar o objeto do teste como sut (system under test)
    const { sut } = makeSut()
    // queremos testar o método route da classe loginRouter
    // sabemos que route recebe um objeto chamado httprequest
    // como queremos testar especificamente a falta da propriedade body, passamos um objeto vazio
    const httpRequest = {
    }
    const httpResponse = sut.route(httpRequest)
    // esperamos que o nosso httpResponse retorne status 500
    expect(httpResponse.statusCode).toBe(500)
  })
})

// definimos um teste unitário da rota de login
describe('Login Router', () => {
  // se não recebermos os dados autorizados devemos retornar com um erro 401
  // o erro 401 é um erro de credenciais não permitidas em uma autenticação
  test('should call AuthUserCase with correct params', () => {
    // criamos uma nova instância da classe LoginRouter, que não existe ainda
    // esse é o conceito do TDD, primeiro criamos o teste para só depois criar o código
    // um padrão comum é chamar o objeto do teste como sut (system under test)
    const { sut, authUseCaseSpy } = makeSut()
    // queremos testar a autenticação de um usuário
    // para tanto, passamos email e senha
    const httpRequest = {
      body: {
        email: 'any_email@test.com',
        password: 'any_password'
      }
    }
    sut.route(httpRequest)
    // esperamos que o email autenticado no server corresponda ao email que vamos receber da requisição do usuário no client
    expect(authUseCaseSpy.email).toBe(httpRequest.body.email)
    // esperamos que o password autenticado no server corresponda ao password que vamos receber da requisição do usuário no client
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password)
  })
})
