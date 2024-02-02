// "use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "achievements",
            [
                {

                    nama_cp: "pencerahan mmk",
                    jum_soal: 1,
                    materials_id: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    nama_cp: "mmk is good",
                    jum_soal: 1,
                    materials_id: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete(
            "achievements", null,
            {
                truncate: true,
                cascade: true,
                restartIdentity: true,
            },
        );
    },
};
