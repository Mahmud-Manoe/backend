const { JSON } = require("sequelize");
const models = require("../models/index");
const { InternalServerError } = require("../utils/response.js");

class StudentRepository {
    async getAll() {
        try {
            const student = await models.students.findAll({
                attributes: {
                    exclude: ["updatedAt", "createdAt"],
                },
            });
            return student;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async getOneById(id) {
        try {
            const student = await models.students.findOne({
                where: { id },
                attributes: {
                    exclude: ["updatedAt", "createdAt"],
                },
            });
            return student;
        } catch (err) {
            throw new InternalServerError();
        }
    }
    async getOneByUser(id) {
        try {
            const student = await models.students.findOne({
                where: { users_id: id },
                attributes: {
                    exclude: ["updatedAt", "createdAt"],
                },
            });
            return student;
        } catch (err) {
            throw new InternalServerError();
        }
    }
    async getAllByInvitationId(id) {
        try {
            const student = await models.students.findAll({
                where: { invitations_id: id },
                attributes: {
                    exclude: ["updatedAt", "createdAt"],
                },
                include: [
                    {
                        model: models.users,
                    },
                ]
            });
            return student;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async getStudentByUser(id) {
        try {
            const user = await models.students.findAll({
                where: {
                    users_id: id,
                },
                attributes: {
                    exclude: ["updatedAt", "createdAt"],
                },
            });


            return user;

        } catch (err) {
            throw new InternalServerError();
        }
    }

    async store(data) {
        try {
            const student = await models.students.create(data);
            const student2 = await models.students.findOne({
                where: {
                    id: student.id,
                },
            });
            const invitation = await models.invitations.findOne({
                where: {
                    id: student.invitations_id,
                }
            })
            const kelas = await models.classes.findOne({
                where: {
                    id: invitation.classes_id,
                }
            })
            return kelas;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async update(id, data) {
        try {
            await models.students.update(data, { where: { id } });
            const student = await models.students.findAll({
                where: {
                    id,
                },
            });
            return student;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async deleteStudent(id) {
        try {
            models.students.destroy({
                where: {
                    id,
                },
            });
            return { id: parseInt(id) };
        } catch (err) {
            throw new InternalServerError();
        }
    }
    async deleteStudentByUser(users_id, invitations_id, data) {
        try {
            await models.students.destroy({
                where: {
                    users_id,
                    invitations_id,
                },
            });
            const student = await models.students.findOne({
                where: {
                    users_id,
                    invitations_id,
                },
            });
            return { id: parseInt(data) };
        } catch (err) {
            throw new InternalServerError();
        }
    }

}
module.exports = new StudentRepository();
