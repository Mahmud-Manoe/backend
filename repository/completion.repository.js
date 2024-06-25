const models = require("../models/index");
const { InternalServerError } = require("../utils/response.js");

class CompletionRepository {
    async getAll() {
        try {
            const completion = await models.completions.findAll({

            });
            return completion;
        } catch (err) {
            console.log(err);
            // throw new InternalServerError();
        }
    }

    async getOneById(id) {
        try {
            const completion = await models.completions.findOne({
                where: { id },
                include: [
                    {
                        model: models.materials,
                    },
                ]

            });
            return completion;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async getOneByMaterialId(id) {
        try {
            const completion = await models.completions.findOne({
                where: { materials_id: id },
                include: [
                    {
                        model: models.materials,
                    },
                ]


            });
            return completion;
        } catch (err) {
            throw new InternalServerError();
        }
    }
    async store(data) {
        try {
            const completion = await models.completions.create(data);
            const completion2 = await models.completions.findOne({
                where: {
                    id: completion.id,
                },
            });
            return completion2;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async update(id, data) {
        try {
            await models.completions.update(data, { where: { id } });
            const completion = await models.completions.findOne({
                where: {
                    id: id,
                },
            });
            return completion;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async deleteCompletion(id) {
        try {
            // await cloudinary.uploader.destroy(file)
            models.completions.destroy({
                where: { id },
            });
            return { id: parseInt(id) };
        } catch (err) {
            console.log(err);
            // throw new InternalServerError();
        }
    }
}
module.exports = new CompletionRepository();
