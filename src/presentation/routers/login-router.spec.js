// após criar o setup do teste pelo método describe, criamos a classe LoginRouter
// a criamos no mesmo arquivo, por enquanto
class LoginRouter {
  // route recebe o objeto httpRequest
  route (httpRequest) {
    // se httpRequest for false, ou seja, se ele não foi passado ou se a propriedade body for false
    if (!httpRequest || !httpRequest.body) {
      // retornamos o retorno do método serverError
      return HttpResponse.serverError()
    }
    const { email, password } = httpRequest.body
    // se a propriedade email dentro do objeto não existir
    if (!email) {
      // retornamos o retorno do método badRequest
      // dentro de badRequest podemos informar qual campo queremos testar passando a string correspondente
      return HttpResponse.badRequest('email')
    }
    if (!password) {
      // retornamos o retorno do método badRequest
      // dentro de badRequest podemos informar qual campo queremos testar passando a string correspondente
      return HttpResponse.badRequest('password')
    }
  }
}

// os métodos na classe HttpResponse descrevem o motivo dos códigos, o método também é uma espécie de documentação
class HttpResponse {
  // método/função badRequest recebe a string passada como parâmetro
  static badRequest (paramName) {
    return {
      statusCode: 400,
      // criamos a propriedade body que recebe uma instância de MissingParamError e que recebe a string passada como parâmetro
      // MissingParamError retorna a mensagem de erro
      body: new MissingParamError(paramName)
    }
  }

  static serverError () {
    return {
      statusCode: 500
    }
  }
}

// extendemos MissingParamError de Error
class MissingParamError extends Error {
  // criamos um constructor que recebe um parâmetro
  constructor (paramName) {
    // super recebe o parâmetro e renderiza a mensagem abaixo
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamError'
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
    const sut = new LoginRouter()
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
    const sut = new LoginRouter()
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
    const sut = new LoginRouter()
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
    const sut = new LoginRouter()
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
