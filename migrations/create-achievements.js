// 'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("achievements", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            nama_cp: {
                type: Sequelize.STRING,
            },
            jum_soal: {
                type: Sequelize.INTEGER,
            },
            materials_id: {
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable("achievements");
    },
};
