const BookService = require("../../../services/book.service.js");
const MaterialService = require("../../../services/material.service.js");
const { SuccessFetchResponse } = require("../../../utils/response.js");

class BookController {
    async getBooks(req, res) {
        try {
            const data = await BookService.getAll();
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }

    async getBookById(req, res) {
        try {
            const id = req.params.id;
            const data = await BookService.getOneById(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }

    async getBookByClassId(req, res) {
        try {
            const id = req.params.id;
            const material = await MaterialService.getOneByClassId(id);
            const data = await BookService.getOneByMaterialId(material.id);
            console.log(id);

            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }

    async createBook(req, res) {
        try {
            const id = req.query.materials_id;
            const data = await BookService.createBook(id, req);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }

    async updateBookById(req, res) {
        try {
            const id = req.params.id;
            const data = await BookService.updateBook(id, req);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }

    async deleteBook(req, res) {
        try {
            const book_id = req.query.books_id;
            const material_id = req.query.materials_id;

            await MaterialService.deleteMaterial(material_id)
            const data = await BookService.deleteBook(book_id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }

}
module.exports = new BookController();
