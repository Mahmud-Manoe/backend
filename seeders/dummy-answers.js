// "use strict";

const questions = require("../models/questions");

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "answers",
            [
                {
                    jawaban: "A",
                    users_id: 2,
                    questions_id: 1,
                    boolean: true,
                    skor: 3,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {

                    jawaban: "B",
                    users_id: 2,
                    questions_id: 2,
                    boolean: false,
                    skor: 0,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {

                    jawaban: "C",
                    users_id: 2,
                    questions_id: 3,
                    boolean: true,
                    skor: 3,
                    created_at: new Date(),
                    updated_at: new Date(),
                },

            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete(
            "answers", null,
            {
                truncate: true,
                cascade: true,
                restartIdentity: true,
            });
    },
};
