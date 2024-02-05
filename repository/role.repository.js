const models = require("../models/index");
const { InternalServerError } = require("../utils/response.js");

class RoleRepository {
  async getAll() {
    try {
      console.log("h");
      const role = await models.roles.findAll({});
      console.log(role);
      return role;
    } catch (err) {
      console.log(err);
      //   throw new InternalServerError();
    }
  }

  async getOneById(id) {
    try {
      const role = await models.roles.findOne({
        where: { id },
        attributes: {
          exclude: ["updatedAt", "createdAt"],
        },
      });
      return role;
    } catch (err) {
      throw new InternalServerError();
    }
  }
}
module.exports = new RoleRepository();
