//@ts-check
"use strict";

const models = require('../../models');
const maestroService = require('./../../servicios/plat_maestro/maestros');


module.exports = {
    busquedaValoresLista
};


/**
 * Guarda el modelo
 * @body {} id Id de la lista
 * @return {Promise<object>} modelo
 */
async function busquedaValoresLista(req, res, next) {
    try {
        if (req.query.id == undefined) {
            throw {error: new Error("Argumento no encontrado"), status: 400, message: "No se ha definido los valores para la búsqueda"};
        }
        let valoreslista = await maestroService.busquedaListaDetalle(req.query.id);
        return res.status(200).send(valoreslista);
    }
    catch (err) {
        return next(err);
    }
}