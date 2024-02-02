const models = require("../models/index");
const { InternalServerError } = require("../utils/response.js");

class UserRepository {

  async getOneByEmail(query) {
    try {
      const { email } = query;
      const user = await models.users.findOne({
        where: { email },
      });

      return user;
    } catch (err) {
      console.log(err);
      throw new InternalServerError();
    }
  }
  async getOneById(id) {
    try {
      const user = await models.users.findOne({
        where: {
          id,
        },
        // include: [
        //   {
        //     model: models.roles,
        //     attributes: {
        //       exclude: ["updatedAt", "createdAt"],
        //     },
        //   },
        // ]
      });
      return user;
    } catch (err) {
      // console.log(err);
      throw new InternalServerError();
    }
  }
  async getAll() {
    try {
      const kelas = await models.users.findAll({});
      return kelas;
    } catch (err) {
      // console.log(err);
      throw new InternalServerError();
    }
  }
  async store(data) {
    try {
      const user = await models.users.create(data);
      const newUser = await models.users.findOne({
        where: {
          id: user?.id,
        },
        attributes: {
          exclude: ["password", "deleted_at", "deleted_by"],
        },
      });
      return newUser;
    } catch (err) {
      console.log(err);

      // throw new InternalServerError();
    }
  }
  async update(id, data) {
    try {
      await models.users.update(data, { where: { id } });
      const user = await models.users.findOne({
        where: {
          id: id,
        },
        attributes: {
          exclude: ["password"],
        },
      });
      return user;
    } catch (err) {
      throw new InternalServerError();
    }
  }
}

module.exports = new UserRepository();
