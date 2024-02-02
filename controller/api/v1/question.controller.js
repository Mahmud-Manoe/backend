const QuestionService = require("../../../services/question.service.js");
const MaterialService = require("../../../services/material.service.js");
const AchievementService = require("../../../services/achievement.service.js");

const { SuccessFetchResponse } = require("../../../utils/response.js");

class QuestionController {
    async getQuestions(req, res) {
        try {
            const data = await QuestionService.getAll();
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async getQuestionById(req, res) {
        try {
            const id = req.params.id;
            const data = await QuestionService.getOneById(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async getQuestionByClassId(req, res) {
        try {
            const id = req.params.id;
            const material = await MaterialService.getOneByClassId(id);
            const achievement = await AchievementService.getAllByMaterialId(material.id);
            const achId = achievement.map(ele => ele.id)
            const data = await QuestionService.getAllByAchievementId(achId);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async getByAchievementId(req, res) {
        try {
            const id = req.params.id;
            const data = await QuestionService.getAllByAchievementId(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async createQuestion(req, res) {
        try {
            const id = req.query.achievements_id;
            const achievement = await AchievementService.getOneById(id)
            await AchievementService.updateAchievement(achievement.id, {
                jum_soal: achievement.jum_soal + 1
            })
            const data = await QuestionService.createQuestion(id, req.body, null);
            console.log(id, req.body, "ques");
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async createBulkQuestion(req, res) {
        try {
            // data: []
            const id = req.query.achievements_id;
            const jum_soal = req.query.jum_soal;
            await QuestionService.deleteByAchievement(id);
            console.log(jum_soal);
            for (let i = 0; i < jum_soal; i++) {
                await QuestionService.createQuestion(id, req.body, i + 1);
            }
            // return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }


    async updateQuestionById(req, res) {
        try {
            const id = req.params.id;
            const data = await QuestionService.updateQuestion(id, req.body);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }

    async deleteQuestion(req, res) {
        try {
            const id = req.params.id;
            const data = await QuestionService.deleteQuestion(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
}
module.exports = new QuestionController();
