const models = require("../models/index");
const { InternalServerError } = require("../utils/response.js");

class MaterialRepository {
    async getAll() {
        try {
            const material = await models.materials.findAll({});
            return material;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async getOneById(id) {
        try {
            const material = await models.materials.findOne({
                where: { id },
            });
            return material;
        } catch (err) {
            throw new InternalServerError();
        }
    }
    async getOneByMaterialId(id) {
        try {
            const material = await models.materials.findOne({
                where: { classes_id: id },
            });
            return material;
        } catch (err) {
            throw new InternalServerError();
        }
    }
    async getOneByClassId(id) {
        try {
            const material = await models.materials.findOne({
                where: { classes_id: id },
            });
            return material;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async store(data) {
        try {
            const material = await models.materials.create(data);
            const material2 = await models.materials.findOne({
                where: {
                    id: material.id,
                },
            });
            return material2;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async update(id, data) {
        try {
            await models.materials.update(data, { where: { id } });
            const material = await models.materials.findOne({
                where: {
                    id: id,
                },
            });
            console.log("ok");
            return material;
        } catch (err) {
            throw new InternalServerError();
        }
    }
    async updateJumCp(id, data) {
        try {
            await models.materials.update(data, { where: { id } });
            const material = await models.materials.findOne({
                where: {
                    id: id,
                },
            });
            console.log("ok");
            return material;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async deleteMaterial(id) {
        try {
            models.materials.destroy({
                where: { id, },
            });
            return `${id} berhasil di hpus`;
        } catch (err) {
            throw new InternalServerError();
        }
    }
}
module.exports = new MaterialRepository();
