require("dotenv").config();
const InvitationRepository = require("../repository/invitation.repository.js");
const {
    NotAuthenticated,
    NotFound,
    UserAlreadyExists,
    KelasAlreadyExists
} = require("../utils/response.js");

class InvitationService {
    async getAll() {

        const invitation = await InvitationRepository.getAll();
        return invitation;
    }
    async getOneById(id) {
        const isExists = await InvitationRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound();
        }
        const invitation = await InvitationRepository.getOneById(id);
        return invitation;
    }

    async getOneByIdClass(id) {
        const isExists = await InvitationRepository.getOneByIdClass(id);
        if (!isExists) {
            throw new NotFound();
        }

        const invitation = await InvitationRepository.getOneByIdClass(id);
        return invitation;
    }

    async createInvitation(id, data) {
        const classes_id = id;
        const { materi_keberapa, jum_cp } = data
        const Invitation = await InvitationRepository.store({
            materi_keberapa,
            jum_cp,
            classes_id,
        });
        return Invitation;
    }

    async deleteInvitation(id) {
        const isExists = await InvitationRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound();
        }

        const Invitation = await InvitationRepository.deleteInvitation(id);
        return Invitation;
    }

    async deleteInvitationByClass(id) {

        const Invitation = await InvitationRepository.deleteInvitationByClass(id);
        return Invitation;
    }




}


module.exports = new InvitationService();
