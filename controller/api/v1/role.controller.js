const RoleService = require("../../../services/role.service.js");
const { SuccessFetchResponse } = require("../../../utils/response.js");

class RoleController {
    async getRoles(req, res) {
        try {
            const data = await RoleService.getAll();
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async getRoleById(req, res) {
        try {
            const id = req.params.id;
            const data = await RoleService.getOneById(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
}
module.exports = new RoleController();
