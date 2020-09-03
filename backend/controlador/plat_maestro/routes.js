
const controller = require('./controllers')

module.exports = ({router}) => {

    router.get('/valores-lista', controller.busquedaValoresLista);
}