const { sequelize } = require("../models");

// 'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("classes", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            nama_kelas: {
                type: Sequelize.STRING,
            },
            tentang_kelas: {
                type: Sequelize.STRING,
            },
            catatan: {
                type: Sequelize.STRING,
            },
            users_id: {
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
        await queryInterface.dropTable("classes");
    },
};
