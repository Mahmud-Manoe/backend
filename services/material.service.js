require("dotenv").config();
const cloudinaryConfig = require("../config/cloudinary.config.js");
const Upload = require("../utils/upload");
const MaterialRepository = require("../repository/material.repository.js");
const AchievementRepository = require("../repository/achievement.repository.js");
const QuestionRepository = require("../repository/question.repository.js");
const BookService = require("./book.service.js")
const {
    NotAuthenticated,
    NotFound,
    UserAlreadyExists,
    KelasAlreadyExists
} = require("../utils/response.js");
const AchievementService = require("./achievement.service.js");

class MaterialService {
    async getAll() {

        const material = await MaterialRepository.getAll();
        return material;
    }
    async getOneById(id) {

        const material = await MaterialRepository.getOneById(id);
        return material;
    }
    async getOneByClassId(id) {
        const isExists = await MaterialRepository.getOneByClassId(id);
        if (!isExists) {

            throw new NotFound();
        }
        const material = await MaterialRepository.getOneByClassId(id);
        return material;
    }

    async createMaterial(id, data) {
        const classes_id = id;
        const { materi_keberapa, jum_cp, vidio } = data
        const material = await MaterialRepository.store({
            materi_keberapa,
            jum_cp,
            classes_id,
            vidio,
        });
        for (let i = 0; i < jum_cp; i++) {
            await AchievementRepository.store({
                nama_cp: null,
                jum_soal: null,
                vidio: null,
                materials_id: material.id,
            });
        }
        return material;

    }

    async updateMaterial(material_id, book_id, data, req) {

        const { materi_keberapa, jum_cp, vidio, book } = data;
        const isExists = await MaterialRepository.getOneById(material_id);
        if (!isExists) {
            throw new NotFound();
        }
        const Material = await MaterialRepository.update(material_id, {
            materi_keberapa,
            jum_cp,
            vidio,
        });

        if (book === 'undefined' && isExists.jum_cp === parseInt(jum_cp)) return

        if (book === 'undefined' && isExists.jum_cp !== parseInt(jum_cp)) {
            const achievement = await AchievementService.getAllByMaterialId(material_id)
            await QuestionRepository.deleteByAchievementId(achievement)
            await AchievementRepository.deleteAchievementByMaterialId(material_id)
            for (let i = 0; i < jum_cp; i++) {
                await AchievementRepository.store({
                    nama_cp: null,
                    jum_soal: null,
                    materials_id: material_id,
                });
            }

        }

        if (book !== 'undefined' && isExists.jum_cp === parseInt(jum_cp)) {
            const data = await BookService.updateBook(book_id, req);
        }

        if (book !== 'undefined' && isExists.jum_cp !== parseInt(jum_cp)) {
            const achievement = await AchievementService.getAllByMaterialId(material_id)
            await QuestionRepository.deleteByAchievementId(achievement)

            await AchievementRepository.deleteAchievementByMaterialId(material_id)
            for (let i = 0; i < jum_cp; i++) {
                await AchievementRepository.store({
                    nama_cp: null,
                    jum_soal: null,
                    materials_id: material_id,
                });
            }
            await BookService.updateBook(book_id, req);
        }
        return Material;
    }

    async deleteMaterial(id) {
        const isExists = await MaterialRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound();
        }

        const achievement = await AchievementService.getAllByMaterialId(id)
        await QuestionRepository.deleteByAchievementId(achievement);
        await AchievementRepository.deleteAchievementByMaterialId(id);
        const material = await MaterialRepository.deleteMaterial(id);

        return material;
    }
}


module.exports = new MaterialService();
