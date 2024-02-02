const models = require("../models/index");
const { InternalServerError } = require("../utils/response.js");

class KelasRepository {

  async getAll() {
    try {
      const kelas = await models.classes.findAll({});
      return kelas;
    } catch (err) {
      // console.log(err);
      throw new InternalServerError();
    }
  }
  async getOneByName(query) {
    try {
      const { nama_kelas } = query;
      const user = await models.classes.findOne({
        where: { nama_kelas },
      });

      return user;
    } catch (err) {
      throw new InternalServerError();
    }
  }
  async getOneById(id) {
    try {
      const kelas = await models.classes.findOne({
        where: { id },
      });

      return kelas;
    } catch (err) {
      throw new InternalServerError();
    }
  }

  async getByRoleGuru(id) {
    try {
      const user = await models.classes.findAll({
        where: {
          users_id: id,
        },
      });
      return user;
    } catch (err) {
      throw new InternalServerError();
    }
  }
  async getByRoleSiswa(id) {
    try {
      const classes = await models.classes.findAll({
        where: { id: id }

      });
      // const kelas = await models.classes.findOne({
      //   where: {
      //     kode_undangan: user.kode_undangan,
      //   },
      // });


      return classes;

    } catch (err) {
      // throw new InternalServerError();
      console.log(err);
    }
  }

  async store(data) {
    try {
      const kelas = await models.classes.create(data);
      const Kelas2 = await models.classes.findOne({
        where: {
          id: kelas.id,
        },
      });
      return Kelas2;
    } catch (err) {
      throw new InternalServerError();
    }
  }
  async update(id, data) {
    try {
      await models.classes.update(data, { where: { id } });
      const kelas = await models.classes.findOne({
        where: {
          id: id,
        },
      });
      return kelas;
    } catch (err) {
      throw new InternalServerError();
    }
  }

  async updateMateri(id, data) {
    try {
      await models.kelas.update(data, { where: { id } });
      const kelas = await models.kelas.findOne({
        where: {
          id: id,
        },
      });
      return kelas;
    } catch (err) {
      throw new InternalServerError();
    }
  }
  async updateKd(id, data) {
    try {
      await models.kelas.update(data, { where: { id } });
      const kelas = await models.kelas.findOne({
        where: {
          id: id,
        },
      });
      return kelas;
    } catch (err) {
      throw new InternalServerError();
    }
  }

  async hapusKelas(id) {
    try {
      models.classes.destroy({
        where: { id, },
      });
      return { id: parseInt(id) };
    } catch (err) {
      throw new InternalServerError();
    }
  }
}

module.exports = new KelasRepository();
