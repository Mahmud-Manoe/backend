// "use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "classes",
            [
                {
                    nama_kelas: "mmk1",
                    tentang_kelas: "good",
                    catatan: "jangan lupa mandi",
                    users_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    nama_kelas: "mmk1",
                    tentang_kelas: "good",
                    catatan: "jangan lupa mandi",
                    users_id: 2,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete(
            "classes", null,
            {
                truncate: true,
                cascade: true,
                restartIdentity: true,
            },
        );
    },
};
