// "use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "questions",
            [
                {
                    no_soal: 1,
                    soal: "apa?",
                    jawaban_a: "wolo",
                    jawaban_b: "woolo",
                    jawaban_c: "wollo",
                    jawaban_d: "woloo",
                    kunci_jawaban: "a",
                    skor: 1,

                    achievements_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    no_soal: 2,
                    soal: "kabar?",
                    jawaban_a: "habaari",
                    jawaban_b: "habarii",
                    jawaban_c: "habbari",
                    jawaban_d: "habari",
                    kunci_jawaban: "d",
                    skor: 1,
                    achievements_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },

            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete(
            "questions", null,
            {
                truncate: true,
                cascade: true,
                restartIdentity: true,
            }
        );
    },
};
