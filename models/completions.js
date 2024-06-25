// "use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class completions extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            completions.belongsTo(models.materials, {
                foreignKey: "materials_id",
            });
        }
    }
    completions.init(
        {
            cloudinary_id: DataTypes.STRING,
            link_image: DataTypes.STRING,
            materials_id: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "completions",
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );
    return completions;
};
