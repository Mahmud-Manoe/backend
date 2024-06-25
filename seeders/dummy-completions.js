// "use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "completions",
            [
                {

                    cloudinary_id: "A1241e",
                    link_image: "http",
                    materials_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    cloudinary_id: "A1241e",
                    link_image: "http",
                    materials_id: 2,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    cloudinary_id: "A1241e",
                    link_image: "http",
                    materials_id: 3,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("completions", null, {
            truncate: true,
            cascade: true,
            restartIdentity: true,
        });
    },
};
