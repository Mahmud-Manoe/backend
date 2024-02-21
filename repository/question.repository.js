const models = require("../models/index");
const { Op, or } = require("sequelize");

const { InternalServerError } = require("../utils/response.js");

class QuestionRepository {
    async getAll() {
        try {
            const question = await models.questions.findAll({});
            return question;
        } catch (err) {
            throw new InternalServerError();
        }
    }
    async getAllByAchievementId(id) {
        try {
            const question = await models.questions.findAll({
                where: {
                    achievements_id: id
                },
            });
            return question;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async getOneById(id) {
        try {
            const question = await models.questions.findOne({
                where: { id },
                include: [
                    {
                        model: models.achievements,
                    },
                ],
            });
            return question;
        } catch (err) {
            throw new InternalServerError();
        }
    }
    async store(data) {
        try {
            const questions = await models.questions.create(data);
            const questions2 = await models.questions.findOne({
                where: {
                    id: questions.id,
                },
            });
            return questions2;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async update(id, data) {
        try {
            await models.questions.update(data, { where: { id } });
            const questions = await models.questions.findOne({
                where: {
                    id: id,
                },
            });
            return questions;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async deleteByAchievement(id) {
        try {
            models.questions.destroy({
                where: { achievements_id: id, },
            });
            return `${id} berhasil di hpus`;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async deleteByAchievementId(id) {
        try {
            const iden = id.map(e => e.id)
            models.questions.destroy({
                where: {
                    [Op.or]: [{
                        achievements_id: iden
                    }]
                },
                raw: true,
                nest: true,
            });
            return `berhasil di hpus`;
        } catch (err) {
            throw new InternalServerError();
        }
    }
    async deleteByOneAchievementId(id) {
        try {
            models.questions.destroy({
                where: { achievements_id: id, },
            });
            return { id: parseInt(id) };
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async deleteQuestion(id) {
        try {
            models.questions.destroy({
                where: { id, },
            });
            return { id: parseInt(id) };
        } catch (err) {
            throw new InternalServerError();
        }
    }
}
module.exports = new QuestionRepository();
