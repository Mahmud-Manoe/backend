// "use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "users",
            [
                {
                    username: "guru212",
                    email: "guru212@gmail.com",
                    password: "guru212",
                    no_wa: "0822",
                    roles_id: 2,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    username: "murid212",
                    email: "murid212@gmail.com",
                    password: "murid212",
                    no_wa: "0822",
                    roles_id: 3,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("users", null,
            {
                truncate: true,
                cascade: true,
                restartIdentity: true,
            }
        );
    },
};
