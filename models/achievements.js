// "use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class achievements extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            achievements.belongsTo(models.materials, {
                foreignKey: "materials_id",
            });
        }
    }
    achievements.init(
        {
            nama_cp: DataTypes.STRING,
            jum_soal: DataTypes.INTEGER,
            materials_id: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "achievements",
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );
    return achievements;
};
