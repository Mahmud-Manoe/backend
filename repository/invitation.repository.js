const models = require("../models/index");
const { InternalServerError } = require("../utils/response.js");

class InvitationRepository {
  async getAll() {
    try {
      const invitation = await models.invitations.findAll({});
      return invitation;
    } catch (err) {
      throw new InternalServerError();
    }
  }

  async getOneById(id) {
    try {
      const invitation = await models.invitations.findOne({
        where: { id },
      });
      return invitation;
    } catch (err) {
      throw new InternalServerError();
    }
  }
  async getOneByIdClass(id) {
    try {
      const invitation = await models.invitations.findOne({
        where: { classes_id: id },

      });
      return invitation;
    } catch (err) {
      throw new InternalServerError();
    }
  }

  async getInvitationsById(id) {
    try {
      const invitation = await models.invitations.findAll({
        where: { id: id }

      });

      return invitation;

    } catch (err) {
      throw new InternalServerError();
    }
  }
  async getOneByCode(kode_undangan) {
    try {
      const invitation = await models.invitations.findOne({
        where: { kode_undangan },
      });

      return invitation;
    } catch (err) {
      throw new InternalServerError();
    }
  }


  async store(data) {
    try {
      const invitation = await models.invitations.create(data);
      const invitation2 = await models.invitations.findOne({
        where: {
          id: invitation.id,
        },
      });
      return invitation2;
    } catch (err) {
      throw new InternalServerError();
    }
  }

  async deleteInvitation(id) {
    try {
      models.invitations.destroy({
        where: { id, },
      });
      return `undangan dngan id ${id} berhasil di hpus`;
    } catch (err) {
      throw new InternalServerError();
    }
  }

  async deleteInvitationByClass(id) {
    try {
      models.invitations.destroy({
        where: { classes_id: id },
      });
      return `undangan dngan id ${id} berhasil di hpus`;
    } catch (err) {
      throw new InternalServerError();
    }
  }

}
module.exports = new InvitationRepository();
