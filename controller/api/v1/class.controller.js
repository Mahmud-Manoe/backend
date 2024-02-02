const KelasService = require("../../../services/kelas.service.js");
const { SuccessFetchResponse } = require("../../../utils/response.js");

class ClassController {
  async buatkelas(req, res) {
    try {
      const { id } = req.user;
      const data = await KelasService.buatKelas(id, req.body);
      return SuccessFetchResponse(res, data);
    } catch (err) {
      res.status(err.status).send(err);
    }
  }
  async lihatKelas(_, res) {
    try {
      const data = await KelasService.getAll();
      return SuccessFetchResponse(res, data);
    } catch (err) {
      res.status(err.status).send(err);
    }
  }
  async getKelasById(req, res) {

    try {
      const id = req.params.id;
      const data = await KelasService.getOneById(id);
      return SuccessFetchResponse(res, data);
    } catch (err) {
      res.status(err.status).send(err);
    }
  }
  async kelasGuru(req, res) {
    try {
      const { id } = req.user;
      const data = await KelasService.getByRoleGuru(id);
      return SuccessFetchResponse(res, data);
    } catch (err) {
      res.status(err.status).send(err);
    }
  }

  async kelasSiswa(req, res) {
    try {
      const { id } = req.user;
      console.log("con");
      const data = await KelasService.getByRoleSiswa(id);
      return SuccessFetchResponse(res, data);
    } catch (err) {
      res.status(err.status).send(err);
    }
  }

  async updateKelasById(req, res) {
    const id = req.params.id;
    console.log(id);
    try {
      const data = await KelasService.updateKelas(id, req.body);
      return SuccessFetchResponse(res, data);
    } catch (err) {
      res.status(err.status).send(err);
    }
  }

  async hapusKelas(req, res) {
    try {
      const id = req.params.id;
      const data = await KelasService.hapusKelas(id, req.user);
      return SuccessFetchResponse(res, data);
    } catch (err) {
      res.status(err.status).send(err);
    }
  }
}

module.exports = new ClassController();
