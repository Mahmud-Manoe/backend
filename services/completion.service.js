require("dotenv").config();
const cloudinaryConfig = require("../config/cloudinary.config.js");
const CompletionRepository = require("../repository/completion.repository.js");
const {
    NotAuthenticated,
    NotFound,
    UserAlreadyExists,
    KelasAlreadyExists
} = require("../utils/response.js");

class CompletionService {
    async getAll() {
        const completion = await CompletionRepository.getAll();
        return completion;
    }

    async getOneById(id) {
        const isExists = await CompletionRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound();
        }
        const completion = await CompletionRepository.getOneById(id);
        return completion;
    }

    async getOneByMaterialId(id) {
        const isExists = await CompletionRepository.getOneByMaterialId(id);
        if (!isExists) {
            throw new NotFound();
        }
        const completion = await CompletionRepository.getOneByMaterialId(id);
        return completion;
    }

    async createCompletion(id, req) {

        const materials_id = id;
        const uploadCompletion = await cloudinaryConfig.uploader.upload(req.file.path, {
            folder: 'Materi',
            use_filename: true,
            unique_filename: false,
        },)

        const link_image = uploadCompletion.secure_url;
        const cloudinary_id = uploadCompletion.public_id;
        const completion = await CompletionRepository.store({
            cloudinary_id,
            link_image,
            materials_id,
        });
        return completion
    }

    async updateCompletion(id, req) {

        const isExists = await CompletionRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound();
        }

        await cloudinaryConfig.uploader.destroy(isExists.cloudinary_id);

        const uploadCompletion = await cloudinaryConfig.uploader.upload(req.file.path, {
            folder: 'Materi',
            use_filename: true,
            unique_filename: false,
        },)
        const link_image = uploadCompletion.secure_url;
        const cloudinary_id = uploadCompletion.public_id;
        console.log(isExists);
        const completion = await CompletionRepository.update(id, {
            cloudinary_id,
            link_image,
        });
        return completion;
    }

    async deleteCompletion(id) {
        const isExists = await CompletionRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound();
        }
        // await cloudinaryConfig.uploader.destroy(isExists.cloudinary_id);

        const completion = await CompletionRepository.deleteCompletion(id);
        return completion;
    }
}


module.exports = new CompletionService();
