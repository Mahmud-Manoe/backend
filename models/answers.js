// "use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class answers extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            answers.belongsTo(models.users, {
                foreignKey: "users_id",
            });
            answers.belongsTo(models.questions, {
                foreignKey: "questions_id",
            });
        }
    }
    answers.init(
        {
            jawaban: DataTypes.STRING,
            users_id: DataTypes.INTEGER,
            questions_id: DataTypes.INTEGER,
            boolean: DataTypes.STRING,
            skor: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "answers",
        }
    );
    return answers;
};
