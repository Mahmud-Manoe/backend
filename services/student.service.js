require("dotenv").config();
const InvitationRepository = require("../repository/invitation.repository.js");
const StudentRepository = require("../repository/student.repository.js");
const KelasRepository = require("../repository/kelas.repository.js");
const {
    NotAuthenticated,
    NotFound,
    UserAlreadyExists,
    KelasAlreadyExists
} = require("../utils/response.js");

class StudentService {
    async getAll() {

        const student = await StudentRepository.getAll();
        return student;
    }
    async getOneById(id) {

        const student = await StudentRepository.getOneById(id);
        return student;
    }
    async getOneByUser(id) {
        const isExists = await StudentRepository.getOneByUser(id);
        if (!isExists) {
            throw NotFound
        }
        const student = await StudentRepository.getOneByUser(id);
        return student;
    }
    async getAllByInvitationId(id) {

        const student = await StudentRepository.getAllByInvitationId(id);
        return student;
    }
    async getClassesStudent(id) {
        const student = await StudentRepository.getStudentByUser(id);
        const resultS = student.map(x => x.invitations_id);
        const invitation = await InvitationRepository.getInvitationsById(resultS);
        const resultI = invitation.map(x => x.classes_id);
        const kelas = await KelasRepository.getByRoleSiswa(resultI);

        return kelas;
    }



    async createStudent(id, data) {
        const { kode_undangan } = data
        const invitation = await InvitationRepository.getOneByCode(kode_undangan)
        console.log(invitation.id);
        const Student = await StudentRepository.store({
            invitations_id: invitation.id,
            users_id: id,
        });
        return Student;
    }

    async updateStudent(id, data) {

        const { materi_keberapa, jum_cp } = data;
        const isExists = await StudentRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound();
        }

        const Student = await StudentRepository.update(id, {
            materi_keberapa,
            jum_cp,
        });

        return Student;
    }

    async deleteStudent(id) {
        const isExists = await StudentRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound();
        }


        const Student = await StudentRepository.deleteStudent(id);
        return Student;
    }
    async deleteStudentByUser(id, data) {
        const invitation = await InvitationRepository.getOneByIdClass(data)
        const Student = await StudentRepository.deleteStudentByUser(id, invitation.id, data);
        return Student;
    }
}


module.exports = new StudentService();
