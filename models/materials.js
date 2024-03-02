// "use strict";
const { Model, STRING } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class materials extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            materials.belongsTo(models.classes, {
                foreignKey: "classes_id",
            });
        }
    }
    materials.init(
        {

            materi_keberapa: DataTypes.INTEGER,
            jum_cp: DataTypes.INTEGER,
            vidio: DataTypes.STRING,
            classes_id: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: "materials",
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );
    return materials;
};
