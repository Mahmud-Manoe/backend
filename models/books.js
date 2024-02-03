// "use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class books extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            books.belongsTo(models.materials, {
                foreignKey: "materials_id",
            });
        }
    }
    books.init(
        {
            cloudinary_id: DataTypes.STRING,
            link_pdf: DataTypes.STRING,
            materials_id: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "books",
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );
    return books;
};
