// 'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("students", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            invitations_id: {
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable("students");
    },
};
