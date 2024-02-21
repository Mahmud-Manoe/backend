const MaterialService = require("../../../services/material.service.js");
const BookService = require("../../../services/book.service.js");
const { SuccessFetchResponse } = require("../../../utils/response.js");

class MaterialController {
    async getMaterials(req, res) {
        try {
            const data = await MaterialService.getAll();
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async getMaterialById(req, res) {
        try {
            const id = req.params.id;
            const data = await MaterialService.getOneById(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async getMaterialByclassId(req, res) {
        try {
            const id = req.params.id;
            const data = await MaterialService.getOneByClassId(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async createMaterial(req, res) {
        try {
            const id = req.query.classes_id;
            const data = await MaterialService.createMaterial(id, req.body);

            const books = await BookService.createBook(data.id, req);
            for (let i = 0; i < req.body.jum_cp; i++) {
            }
            return SuccessFetchResponse(res, { data: data, book: books });


        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async updateMaterialById(req, res) {
        try {
            const idm = req.params.id;
            const idb = req.query.book_id
            const data = await MaterialService.updateMaterial(idm, idb, req.body, req);

            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }

    async deleteMaterial(req, res) {
        try {
            const id = req.params.id;
            const data = await MaterialService.deleteMaterial(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }

}
module.exports = new MaterialController();
