// "use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "books",
            [
                {

                    cloudinary_id: "A1241e",
                    link_pdf: "http",
                    materials_id: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cloudinary_id: "A1241e",
                    link_pdf: "http",
                    materials_id: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cloudinary_id: "A1241e",
                    link_pdf: "http",
                    materials_id: 3,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("books", null, {
            truncate: true,
            cascade: true,
            restartIdentity: true,
        });
    },
};
