/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('listadetalle', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        idlista: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        valortexto: {
            type: DataTypes.STRING,
            allowNull: true
        },
        orden: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        estaactivo: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    }, {
        tableName: 'listadetalle',
        schema:'public'
    });
};
