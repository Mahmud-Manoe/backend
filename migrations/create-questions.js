// 'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("questions", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            no_soal: {
                type: Sequelize.INTEGER,
            },
            soal: {
                type: Sequelize.STRING,
            },
            jawaban_a: {
                type: Sequelize.STRING,
            },
            jawaban_b: {
                type: Sequelize.STRING,
            },
            jawaban_c: {
                type: Sequelize.STRING,
            },
            jawaban_d: {
                type: Sequelize.STRING,
            },
            kunci_jawaban: {
                type: Sequelize.STRING,
            },
            skor: {
                type: Sequelize.STRING,
            },
            achievements_id: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable("soal");
    },
};
