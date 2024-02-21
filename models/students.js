// "use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class students extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            students.belongsTo(models.invitations, {
                foreignKey: "invitations_id",
            });
            students.belongsTo(models.users, {
                foreignKey: "users_id",
            });
        }
    }
    students.init(
        {
            invitations_id: DataTypes.INTEGER,
            users_id: DataTypes.INTEGER,
            nilai: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "students",
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );
    return students;
};
