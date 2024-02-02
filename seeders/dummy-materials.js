// "use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "materials",
            [
                {
                    materi_keberapa: 15,
                    jum_cp: 2,
                    classes_id: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    materi_keberapa: 15,
                    jum_cp: 2,
                    classes_id: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete(
            "materials", null,
            {
                truncate: true,
                cascade: true,
                restartIdentity: true,
            },
        );
    },
};
