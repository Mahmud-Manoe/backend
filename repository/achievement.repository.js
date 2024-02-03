const models = require("../models/index");
const { InternalServerError } = require("../utils/response.js");

class AchievementRepository {
    async getAll() {
        try {
            const achievement = await models.achievements.findAll({});
            return achievement;
        } catch (err) {

            throw new InternalServerError();
        }
    }

    async getOneById(id) {
        try {
            const achievement = await models.achievements.findOne({
                where: { id },
                include: [
                    {
                        model: models.materials,
                    },
                ],
                raw: true,
                nest: true,
            });
            return achievement;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async getAllByMaterialId(id) {
        try {
            const achievement = await models.achievements.findAll({
                where: { materials_id: id },
                include: [
                    {
                        model: models.materials,
                    },
                ],
            });
            return achievement;
        } catch (err) {
            throw new InternalServerError();
        }
    }
    async store(data) {
        try {
            const achievement = await models.achievements.create(data);
            const achievement2 = await models.achievements.findOne({
                where: {
                    id: achievement.id,
                },
                include: [
                    {
                        model: models.materials,
                    },
                ],
            });
            return achievement2;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async update(id, data) {
        try {
            await models.achievements.update(data, { where: { id } });
            const achievement = await models.achievements.findOne({
                where: {
                    id: id,
                },
                include: [
                    {
                        model: models.materials,
                    },
                ],
            });
            return achievement;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async deleteAchievement(id) {
        try {
            models.achievements.destroy({
                where: { id, },
            });
            return { id: parseInt(id) };
        } catch (err) {
            throw new InternalServerError();
        }
    }


    async deleteAchievementByMaterialId(id) {
        try {
            models.achievements.destroy({
                where: { materials_id: id },
            });
            return `achievements id ${id} berhasil di hpus`;
        } catch (err) {
            throw new InternalServerError();
        }
    }


    async updateAchievementByMaterialId(id, data) {
        try {
            models.achievements.update(data, {
                where: { materials_id: id, },
            });
            return `achievements id ${id} berhasil di ubah`;
        } catch (err) {
            throw new InternalServerError();
        }
    }
}
module.exports = new AchievementRepository();
