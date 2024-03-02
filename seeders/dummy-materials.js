// "use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "materials",
            [
                {
                    materi_keberapa: 15,
                    jum_cp: 2,
                    vidio: "https://www.youtube.com/embed/ZrpEIw8IWwk?si=Gfhuti5qaQtAKWHC",
                    classes_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    materi_keberapa: 15,
                    jum_cp: 2,
                    vidio: "https://www.youtube.com/embed/ZrpEIw8IWwk?si=Gfhuti5qaQtAKWHC",
                    classes_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),

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
