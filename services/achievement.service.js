require("dotenv").config();
const AchievementRepository = require("../repository/achievement.repository.js");
const MaterialRepository = require("../repository/material.repository.js");
const QuestionRepository = require("../repository/question.repository.js");
const {
    NotAuthenticated,
    NotFound,
    UserAlreadyExists,
    KelasAlreadyExists
} = require("../utils/response.js");

class AchievementService {
    async getAll() {

        const achievement = await AchievementRepository.getAll();
        return achievement;
    }
    async getOneById(id) {
        const isExists = await AchievementRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound();
        }
        const achievement = await AchievementRepository.getOneById(id);
        return achievement;
    }
    async getAllByMaterialId(id) {
        const achievement = await AchievementRepository.getAllByMaterialId(id);
        return achievement;
    }

    async createAchievement(id, data) {
        const materials_id = id;
        const { nama_cp, jum_soal } = data
        const achievement = await AchievementRepository.store({
            nama_cp,
            jum_soal,
            materials_id,
        });
        await MaterialRepository.updateJumCp(achievement.materials_id, {
            jum_cp: achievement.material.jum_cp + 1
        })
        return achievement;
    }

    async updateAchievement(id, data) {

        const { nama_cp,
            jum_soal,
            materials_id, } = data
        const isExists = await AchievementRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound();
        }
        const achievement = await AchievementRepository.update(id, {
            nama_cp,
            jum_soal,
            materials_id,
        });

        return achievement;
    }

    async deleteAchievement(id) {
        const isExists = await AchievementRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound();
        }
        console.log(isExists.material);
        await QuestionRepository.deleteByOneAchievementId(id)
        await MaterialRepository.updateJumCp(isExists.material.id, {
            jum_cp: isExists.material.jum_cp - 1
        })
        const achievement = await AchievementRepository.deleteAchievement(id);
        return achievement;
    }
    async deleteAchievementByMaterialId(id) {
        const achievement = await AchievementRepository.deleteAchievementByMaterialId(id);
        return achievement;
    }


}


module.exports = new AchievementService();
