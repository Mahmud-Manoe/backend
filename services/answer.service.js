require("dotenv").config();
const AchievementRepository = require("../repository/achievement.repository.js");
const AnswerRepository = require("../repository/answer.repository.js");
const MaterialRepository = require("../repository/material.repository.js");
const questionRepository = require("../repository/question.repository.js");
const {
    NotAuthenticated,
    NotFound,
    UserAlreadyExists,
    KelasAlreadyExists
} = require("../utils/response.js");

class AnswerService {
    async getAll() {

        const answer = await AnswerRepository.getAll();
        return answer;
    }
    async getOneById(id) {

        const answer = await AnswerRepository.getOneById(id);
        return answer;
    }
    async getAllByUser(id) {

        const answer = await AnswerRepository.getAllByUser(id);
        return answer;
    }
    async getAllByTeacher(idk) {

        const materi = await MaterialRepository.getOneByClassId(idk);
        const idm = materi?.id;
        console.log(materi, idm, "id");
        const achievement = await AchievementRepository.getAllByMaterialId(idm);
        const achId = achievement.map(x => x.id);
        const question = await questionRepository.getAllByAchievementId(achId);
        const qId = question.map(x => x.id);
        const answer = await AnswerRepository.getByQuestion(qId);
        return answer;
    }

    async createAnswer(id, data) {
        const users_id = id;
        const { jawaban, questions_id, boolean, skor } = data;
        const Answer = await AnswerRepository.store({
            users_id,
            questions_id,
            jawaban,
            boolean,
            skor,
        });
        return Answer;
    }

    async updateAnswer(id, query, data) {
        const { boolean, skor } = query;
        const { jawaban } = data;
        const isExists = await AnswerRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound();
        }
        const Answer = await AnswerRepository.update(id, {
            jawaban,
            boolean,
            skor,
        });

        return Answer;
    }

    async deleteAnswer(id) {
        const isExists = await AnswerRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound();
        }

        const Answer = await AnswerRepository.deleteAnswer(id);
        return Answer;
    }


}


module.exports = new AnswerService();
