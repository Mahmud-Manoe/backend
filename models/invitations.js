// "use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class invitations extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            invitations.belongsTo(models.classes, {
                foreignKey: "classes_id",
            });
        }
    }
    invitations.init(
        {
            kode_undangan: DataTypes.STRING,
            classes_id: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "invitations",
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );
    return invitations;
};
