const models = require("../models/index");
const { InternalServerError } = require("../utils/response.js");

class AnswerRepository {
    async getAll() {
        try {
            const answer = await models.answers.findAll({
                attributes: {
                    exclude: ["updatedAt", "createdAt"],
                },
            });
            return answer;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async getOneById(id) {
        try {
            const answer = await models.answers.findOne({
                where: { id },
                attributes: {
                    exclude: ["updatedAt", "createdAt"],
                },
            });
            return answer;
        } catch (err) {
            // console.log(err);
            throw new InternalServerError();
        }
    }
    async getAllByUser(id) {
        try {
            const answer = await models.answers.findAll({
                where: { users_id: id },
                attributes: {
                    exclude: ["updatedAt", "createdAt"],
                },
            });
            return answer;
        } catch (err) {
            // console.log(err);
            throw new InternalServerError();
        }
    }
    async getByQuestion(id) {
        try {
            const answer = await models.answers.findAll({
                where: {
                    questions_id: id
                },
                attributes: {
                    exclude: ["updatedAt", "createdAt"],
                },
            });
            return answer;
        } catch (err) {
            // console.log(err);
            throw new InternalServerError();
        }
    }
    async store(data) {
        try {
            const answer = await models.answers.create(data);
            const answer2 = await models.answers.findOne({
                where: {
                    id: answer.id,
                },
            });
            return answer2;
        } catch (err) {
            console.log(err);
            throw new InternalServerError();
        }
    }

    async update(id, data) {
        try {
            await models.answers.update(data, { where: { id } });
            const answer = await models.answers.findOne({
                where: {
                    id: id,
                },
            });
            return answer;
        } catch (err) {

            throw new InternalServerError();
        }
    }

    async deleteAnswer(id) {
        try {
            models.answers.destroy({
                where: { id, },
            });
            return `data answers dngan id ${id} berhasil di hpus`;
        } catch (err) {
            throw new InternalServerError();
        }
    }
}
module.exports = new AnswerRepository();
