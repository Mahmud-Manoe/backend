const AchievementService = require("../../../services/achievement.service.js");
const MaterialService = require("../../../services/material.service.js");

const { SuccessFetchResponse } = require("../../../utils/response.js");

class AchievementController {
    async getAchievements(req, res) {
        try {
            const data = await AchievementService.getAll();
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async getAchievementById(req, res) {
        const id = req.params.id;
        try {
            const data = await AchievementService.getOneById(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async getAchievementByMaterialId(req, res) {
        const id = req.params.id;
        try {
            const data = await AchievementService.getAllByMaterialId(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async getAchievementByClassId(req, res) {
        const id = req.params.id;
        try {

            const material = await MaterialService.getOneByClassId(id);
            const data = await AchievementService.getAllByMaterialId(material.id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async createAchievement(req, res) {
        try {
            const id = req.query.materials_id;
            const data = await AchievementService.createAchievement(id, req.body);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }

    async updateAchievementById(req, res) {
        try {
            const id = req.params.id;
            const data = await AchievementService.updateAchievement(id, req.body);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }

    async deleteAchievement(req, res) {
        try {
            const id = req.params.id;
            const data = await AchievementService.deleteAchievement(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
}
module.exports = new AchievementController();
