const InvitationService = require("../../../services/invitation.service.js");
const { SuccessFetchResponse } = require("../../../utils/response.js");

class InvitationController {
    async getInvitations(req, res) {
        try {
            const data = await InvitationService.getAll();
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async getInvitationById(req, res) {
        try {
            const id = req.params.id;
            const data = await InvitationService.getOneById(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async getInvitationByIdClass(req, res) {
        try {
            const id = req.params.id;
            const data = await InvitationService.getOneByIdClass(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }

    async createInvitation(req, res) {
        try {
            const id = req.query.materials_id;
            const data = await InvitationService.createInvitation(id, req);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }

    async deleteInvitation(req, res) {
        try {
            const id = req.params.id;
            const data = await InvitationService.deleteInvitation(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async deleteInvitationByClass(req, res) {
        try {
            const id = req.params.id;
            const data = await InvitationService.deleteInvitationByClass(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
}
module.exports = new InvitationController();
