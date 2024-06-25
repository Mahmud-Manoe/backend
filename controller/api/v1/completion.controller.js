const CompletionService = require("../../../services/completion.service.js");
const MaterialService = require("../../../services/material.service.js");
const { SuccessFetchResponse } = require("../../../utils/response.js");

class CompletionController {
    async getCompletions(req, res) {
        try {
            console.log("aa");
            const data = await CompletionService.getAll();
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }

    async getCompletionById(req, res) {
        try {
            const id = req.params.id;
            const data = await CompletionService.getOneById(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }

    async getCompletionByClassId(req, res) {
        try {
            const id = req.params.id;
            const material = await MaterialService.getOneByClassId(id);
            const data = await CompletionService.getOneByMaterialId(material.id);
            console.log(id);

            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }

    async createCompletion(req, res) {
        try {
            const id = req.query.materials_id;
            const data = await CompletionService.createCompletion(id, req);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }

    async updateCompletionById(req, res) {
        try {
            const id = req.params.id;
            const data = await CompletionService.updateCompletion(id, req);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }

    async deleteCompletion(req, res) {
        try {
            const completion_id = req.params.id;
            // const material_id = req.query.materials_id;
            // await MaterialService.deleteMaterial(material_id)
            const data = await CompletionService.deleteCompletion(completion_id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }

}
module.exports = new CompletionController();
