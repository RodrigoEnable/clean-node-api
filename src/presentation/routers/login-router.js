import HttpResponse from '../helpers/http-response'

// após criar o setup do teste pelo método describe, criamos a classe LoginRouter
// a criamos no mesmo arquivo, por enquanto
export default class LoginRouter {
  // definimos o construtor que receberá authUserCaseSpy
  constructor (authUseCaseSpy) {
    // atribuímos authUserCaseSpy a uma variável interna de mesmo nome por meio do this
    this.authUseCaseSpy = authUseCaseSpy
  }

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
    // chamamos o método auth e passamos email e password como argumento
    this.authUseCaseSpy.auth(email, password)
  }
}
