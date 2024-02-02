// "use strict";
const { Model, INTEGER } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            users.belongsTo(models.roles, {
                foreignKey: "roles_id",
            });
        }
    }
    users.init(
        {
            username: DataTypes.STRING,
            email: DataTypes.STRING,
            no_wa: DataTypes.INTEGER,
            password: DataTypes.STRING,
            roles_id: DataTypes.INTEGER,

        },
        {
            sequelize,
            modelName: "users",
        }
    );
    return users;
};
