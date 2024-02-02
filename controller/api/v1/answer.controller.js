const AnswerService = require("../../../services/answer.service.js");
const { SuccessFetchResponse } = require("../../../utils/response.js");

class AnswerController {
    async getAnswers(req, res) {
        try {
            const data = await AnswerService.getAll();
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async getAnswerById(req, res) {
        try {
            const id = req.params.id;
            const data = await AnswerService.getOneById(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async getAnswerByUser(req, res) {
        try {
            const { id } = req.user;
            const data = await AnswerService.getAllByUser(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async getAnswerByTeacher(req, res) {
        try {
            const id = req.params.id;
            const data = await AnswerService.getAllByTeacher(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async createAnswer(req, res) {
        try {
            const { id } = req.user
            const data = await AnswerService.createAnswer(id, req.body);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }

    async updateAnswerById(req, res) {
        try {
            const id = req.params.id;
            const data = await AnswerService.updateAnswer(id, req.query, req.body);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }

    async deleteAnswer(req, res) {
        try {
            const id = req.params.id;
            const data = await AnswerService.deleteAnswer(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
}
module.exports = new AnswerController();
