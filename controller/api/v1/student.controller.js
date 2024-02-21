const StudentService = require("../../../services/student.service.js");
const InvitationService = require("../../../services/invitation.service.js");
const { SuccessFetchResponse } = require("../../../utils/response.js");

class StudentController {
    async getStudents(req, res) {
        try {
            const data = await StudentService.getAll();
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async getStudentById(req, res) {
        try {
            const id = req.params.id;
            const data = await StudentService.getOneById(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async getStudentsByInvitationId(req, res) {
        try {
            const id = req.params.id;
            const data = await StudentService.getAllByInvitationId(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async getStudentsByClassId(req, res) {
        try {
            const id = req.params.id;
            const invitation = await InvitationService.getOneByIdClass(id);
            const data = await StudentService.getAllByInvitationId(invitation.id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async getClassesStudent(req, res) {
        try {
            const { id } = req.user;
            const data = await StudentService.getClassesStudent(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async createStudent(req, res) {
        try {
            const { id } = req.user;
            const data = await StudentService.createStudent(id, req.body);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async updateStudentById(req, res) {
        try {
            const id = req.query.id;
            const a = id.split(",")
            const b = a.map(e => parseInt(e))
            const data = await StudentService.updateStudent(b, req.body);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }

    async deleteStudent(req, res) {
        try {
            const id = req.params.id;
            const data = await StudentService.deleteStudent(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async deleteStudentByUser(req, res) {
        try {
            const id = req.user.id;
            const data = await StudentService.deleteStudentByUser(id, req.headers.data);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
}
module.exports = new StudentController();
