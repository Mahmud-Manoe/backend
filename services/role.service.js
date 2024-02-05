require("dotenv").config();
const RoleRepository = require("../repository/role.repository.js");
const {
  NotAuthenticated,
  NotFound,
  UserAlreadyExists,
  KelasAlreadyExists,
} = require("../utils/response.js");

class RoleService {
  async getAll() {
    console.log("hh");
    const role = await RoleRepository.getAll();
    return role;
  }
  async getOneById(id) {
    const role = await RoleRepository.getOneById(id);
    return role;
  }
}

module.exports = new RoleService();
