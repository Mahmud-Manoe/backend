require("dotenv").config();
const bcrypt = require("bcrypt");
const { generateToken, getRandomToken, makeCode } = require("../utils/jwt.util.js");
const KelasRepository = require("../repository/kelas.repository.js");
const InvitationRepository = require("../repository/invitation.repository.js");
const cloudinaryConfig = require("../utils/cloudinary.js");
const { sendEmail } = require("../utils/email")
const {
  NotAuthenticated,
  NotFound,
  UserAlreadyExists,
  KelasAlreadyExists
} = require("../utils/response.js");
const studentRepository = require("../repository/student.repository.js");

class KelasService {

  async buatKelas(id, data) {
    const { nama_kelas, tentang_kelas, catatan } = data;

    const isExists = await KelasRepository.getOneByName({ nama_kelas });
    if (isExists) {
      throw new KelasAlreadyExists();
    }

    const users_id = id;
    const kode = makeCode();

    const kelas = await KelasRepository.store({
      nama_kelas,
      tentang_kelas,
      catatan,
      users_id,
    });

    const invite = await InvitationRepository.store({
      kode_undangan: kode,
      classes_id: kelas?.id,
    });

    const combine = [kelas, invite];
    return combine;
  }
  async getAll() {

    const kelas = await KelasRepository.getAll();
    return kelas;
  }
  async getOneById(id) {

    const kelas = await KelasRepository.getOneById(id);
    return kelas;
  }
  async getByRoleGuru(id) {
    const isExists = await KelasRepository.getByRoleGuru(id);
    if (!isExists) {
      throw new NotFound();
    }
    const kelas = await KelasRepository.getByRoleGuru(id);
    return kelas;
  }

  async getByRoleSiswa(id) {
    console.log("ser");
    const student = await studentRepository.getStudentByUser(id);
    const resultS = student.map(x => x.invitations_id);
    const invitation = await InvitationRepository.getInvitationsById(resultS);
    const resultI = invitation.map(x => x.classes_id);
    const kelas = await KelasRepository.getByRoleSiswa(resultI);

    return kelas;
  }

  async updateKelas(id, data, res) {

    const { nama_kelas,
      tentang_kelas,
      catatan,
    } = data;
    const isExists = await KelasRepository.getOneById(id);
    if (!isExists) {
      throw new NotFound();
    }

    const kelas = await KelasRepository.update(id, {
      nama_kelas,
      tentang_kelas,
      catatan,
    });

    return kelas;

  }

  async hapusKelas(id) {
    const isExists = await KelasRepository.getOneById(id);
    if (!isExists) {
      throw new NotFound();
    }

    const kelas = await KelasRepository.hapusKelas(id);
    return kelas;
  }

}


module.exports = new KelasService();
