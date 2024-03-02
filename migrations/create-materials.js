// 'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("materials", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },

            materi_keberapa: {
                type: Sequelize.INTEGER,
            },
            jum_cp: {
                type: Sequelize.INTEGER,
            },
            vidio: {
                type: Sequelize.STRING,
            },
            classes_id: {
                type: Sequelize.INTEGER
            },

            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("materials");
    },
};
