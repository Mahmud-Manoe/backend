// "use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class questions extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            questions.belongsTo(models.achievements, {
                foreignKey: "achievements_id",
            });
        }
    }
    questions.init(
        {
            no_soal: DataTypes.STRING,
            soal: DataTypes.STRING,
            jawaban_a: DataTypes.STRING,
            jawaban_b: DataTypes.STRING,
            jawaban_c: DataTypes.STRING,
            jawaban_d: DataTypes.STRING,
            kunci_jawaban: DataTypes.STRING,
            skor: DataTypes.STRING,
            achievements_id: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "questions",
        }
    );
    return questions;
};
