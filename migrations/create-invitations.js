// 'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("invitations", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            kode_undangan: {
                type: Sequelize.STRING,
            },
            classes_id: {
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
        await queryInterface.dropTable("invitations");
    },
};
