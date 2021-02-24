import config from './jest.config.js'

// qualquer arquivo (*) dentro de qualquer pasta (**) com a extensão spec.js, será um arquivo válido para essa configuração
// o que fazemos aqui é adicionar ao objeto config a propriedade testMatch
config.testMatch = ['**/*.spec.js']

export default config
