require("dotenv").config();
const AchievementRepository = require("../repository/achievement.repository.js");
const QuestionRepository = require("../repository/question.repository.js");
const {
    NotAuthenticated,
    NotFound,
    UserAlreadyExists,
    KelasAlreadyExists
} = require("../utils/response.js");

class QuestionService {
    async getAll() {

        const question = await QuestionRepository.getAll();
        return question;
    }
    async getAllByAchievementId(id) {

        const question = await QuestionRepository.getAllByAchievementId(id);
        return question;
    }
    async getOneById(id) {

        const question = await QuestionRepository.getOneById(id);
        return question;
    }
    async createQuestion(id, data, nomor) {

        const achievements_id = id;
        const no_soal = nomor
        const {
            soal,
            jawaban_a,
            jawaban_b,
            jawaban_c,
            jawaban_d,
            kunci_jawaban,
            skor,
        } = data
        const Question = await QuestionRepository.store({
            no_soal,
            soal,
            jawaban_a,
            jawaban_b,
            jawaban_c,
            jawaban_d,
            kunci_jawaban,
            skor,
            achievements_id,
        });
        return Question;
    }

    async updateQuestion(id, data) {

        const {
            no_soal,
            soal,
            jawaban_a,
            jawaban_b,
            jawaban_c,
            jawaban_d,
            kunci_jawaban,
            skor,
        } = data
        const isExists = await QuestionRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound();
        }

        const Question = await QuestionRepository.update(id, {
            no_soal,
            soal,
            jawaban_a,
            jawaban_b,
            jawaban_c,
            jawaban_d,
            kunci_jawaban,
            skor,

        });

        return Question;
    }

    async deleteQuestion(id) {
        const isExists = await QuestionRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound();
        }
        await AchievementRepository.update(isExists.achievement.id, {

            jum_soal: isExists.achievement.jum_soal - 1
        })

        const Question = await QuestionRepository.deleteQuestion(id);
        return Question;
    }
    async deleteByAchievement(id) {
        // const isExists = await QuestionRepository.getOneById(id);
        // if (!isExists) {
        //     throw new NotFound();
        // }

        const Question = await QuestionRepository.deleteByAchievement(id);
        return Question;
    }


}


module.exports = new QuestionService();
