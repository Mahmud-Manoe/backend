const models = require("../models/index");
const { InternalServerError } = require("../utils/response.js");

class BookRepository {
    async getAll() {
        try {
            const Book = await models.books.findAll({

            });
            return Book;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async getOneById(id) {
        try {
            const Book = await models.books.findOne({
                where: { id },
                include: [
                    {
                        model: models.materials,
                    },
                ]

            });
            return Book;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async getOneByMaterialId(id) {
        try {
            const Book = await models.books.findOne({
                where: { materials_id: id },
                include: [
                    {
                        model: models.materials,
                    },
                ]


            });
            return Book;
        } catch (err) {
            throw new InternalServerError();
        }
    }
    async store(data) {
        try {
            const book = await models.books.create(data);
            const book2 = await models.books.findOne({
                where: {
                    id: book.id,
                },
            });
            return book2;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async update(id, data) {
        try {
            await models.books.update(data, { where: { id } });
            const book = await models.books.findOne({
                where: {
                    id: id,
                },
            });
            return book;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async deleteBook(id) {
        try {
            // await cloudinary.uploader.destroy(file)
            console.log(id);
            models.books.destroy({
                where: { id },
            });
            return { id: parseInt(id) };
        } catch (err) {
            console.log(err);
            // throw new InternalServerError();
        }
    }
}
module.exports = new BookRepository();
