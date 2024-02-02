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
            classes_id: {
                type: Sequelize.INTEGER
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("materials");
    },
};
