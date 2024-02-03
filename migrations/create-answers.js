// 'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("answers", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            jawaban: {
                type: Sequelize.STRING,
            },
            users_id: {
                type: Sequelize.INTEGER,
            },
            questions_id: {
                type: Sequelize.INTEGER,
            },
            boolean: {
                type: Sequelize.STRING,
            },
            skor: {
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable("answers");
    },
};
