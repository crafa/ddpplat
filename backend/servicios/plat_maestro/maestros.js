const models = require('../../models');


module.exports = {
    busquedaListaDetalle
};


async function busquedaListaDetalle(idlista) {
    try {

        let sql = `
            SELECT id,idlista, valortexto, orden, estaactivo FROM listadetalle WHERE estaactivo = true AND idlista =  ${idlista}
            ORDER BY orden ASC
     `;
        console.log(sql)
        const listaValores = await models.sequelize.query(sql, {type: models.sequelize.QueryTypes.SELECT});
        if (!listaValores) {
            throw {
                error: new Error("No se encontrarón registros para la lista"),
                message: "La lista no tiene valores definidos",
                status: 401
            };
        }
        return listaValores;
    }
    catch (err) {
        throw err;
    }
}