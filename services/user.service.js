require("dotenv").config();
const bcrypt = require("bcrypt");
const { generateToken, getRandomToken, deleteToken } = require("../utils/jwt.util.js");
const cloudinaryConfig = require("../utils/cloudinary.js");
const { sendEmail } = require("../utils/email")
const UserRepository = require("../repository/user.repository.js");
const {
  NotAuthenticated,
  NotFound,
  UserAlreadyExists,
} = require("../utils/response.js");

class UserService {
  async login(email, password) {
    const user = await UserRepository.getOneByEmail({ email });
    if (!user) {
      throw new NotFound();
    }
    const authenticate = await bcrypt.compare(password, user.password);

    if (authenticate) {
      const payload = {
        id: user.id,
        email: user.email,
        roles_id: user.roles_id,
      };

      const token = await generateToken(payload);
      return { ...payload, token: token };
    }
    throw new NotAuthenticated();
  }
  async logout(token) {
    console.log("logout");
  }

  async register(data) {
    const { username, email, password, roles_id } = data;

    const isExists = await UserRepository.getOneByEmail({ email });
    if (isExists) {
      throw new UserAlreadyExists();
    }
    const randomToken = getRandomToken();
    // const content = `https://localhost:300/confirm/${randomToken}?email=${email}`
    // sendEmail(email, 'confirmation', content);


    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await UserRepository.store({
      username,
      email,
      password: encryptedPassword,
      roles_id,
    });

    return user;
  }
  async getOneById(id) {
    const isExists = await UserRepository.getOneById(id);
    if (!isExists) {
      throw new NotFound();
    }
    const user = await UserRepository.getOneById(id);
    return user;
  }

  async getAll() {

    const kelas = await UserRepository.getAll();
    return kelas;
  }
  async updateUser(id, data, req, res) {

    const { username, email, password } = data;

    console.log(data, req.file.path)

    // const isExists = await UserRepository.getOneById(id);
    // if (!isExists) {
    //   throw new NotFound();
    // }
    // console.log(isExists);
    const uploadProfile = await cloudinaryConfig.uploader.upload(
      req.file.path
    );

    console.log(uploadProfile.secure_url);
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await UserRepository.update(id, {
      username,
      email,
      password: encryptedPassword,
      image: uploadProfile.secure_url,
    });

    return user;

  }

}


module.exports = new UserService();
