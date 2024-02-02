const v1 = require("express").Router();
const upload = require("../../utils/multer");
const uploadOnMemory = require("../../utils//uploadOnMemory");
const AchievementController = require("../../controller/api/v1/achievement.controller");
const AnswerController = require("../../controller/api/v1/answer.controller");
const BookController = require("../../controller/api/v1/book.controller");
const kelasController = require("../../controller/api/v1/class.controller");
const InvitationController = require("../../controller/api/v1/invitation.controller");
const MaterialController = require("../../controller/api/v1/material.controller");
const QuestionController = require("../../controller/api/v1/question.controller");
const RoleController = require("../../controller/api/v1/role.controller");
const StudentController = require("../../controller/api/v1/student.controller");
const userController = require("../../controller/api/v1/users.controller");

const Authentication = require("../../middleware/midleware.js");

//achievement
v1.get("/achievements", AchievementController.getAchievements);
v1.get("/achievement/:id", AchievementController.getAchievementById);
v1.get("/achievement/materials/:id", AchievementController.getAchievementByMaterialId);
v1.get("/achievement/class/:id", AchievementController.getAchievementByClassId);
v1.post("/achievement", AchievementController.createAchievement);   //guru
v1.put("/achievement/:id", AchievementController.updateAchievementById);   //guru
v1.delete("/achievement/:id", AchievementController.deleteAchievement);   //guru

//book
v1.get("/books", BookController.getBooks);
v1.get("/book/:id", BookController.getBookById);
v1.get("/book/class/:id", BookController.getBookByClassId);
v1.post("/book", upload.single("book"), BookController.createBook);   //guru
v1.put("/book/:id", upload.single("book"), BookController.updateBookById);   //guru
v1.delete("/book", BookController.deleteBook);   //guru


//answer
v1.get("/answers", AnswerController.getAnswers);
v1.get("/answer/:id", AnswerController.getAnswerById);
v1.get("/answers/user", [Authentication.requiredToken, Authentication.isStudent], AnswerController.getAnswerByUser);
v1.get("/answers/teacher/:id", AnswerController.getAnswerByTeacher);
v1.post("/answers", [Authentication.requiredToken, Authentication.isStudent], AnswerController.createAnswer); //siswa
v1.put("/answer/:id", AnswerController.updateAnswerById);   //guru
v1.delete("/answer/:id", AnswerController.deleteAnswer);   //guru


//KELAS
v1.post("/class", [Authentication.requiredToken, Authentication.isTeacher], kelasController.buatkelas);   //guru
v1.get("/classes/all", [Authentication.requiredToken, Authentication.isAdmin], kelasController.lihatKelas);   //admin
v1.get("/class/:id", [Authentication.requiredToken], kelasController.getKelasById);   //admin
v1.get("/classes/teacher", [Authentication.requiredToken, Authentication.isTeacher], kelasController.kelasGuru);
v1.get("/classes/student", [Authentication.requiredToken, Authentication.isStudent], kelasController.kelasSiswa);
v1.put("/kelas/:id", [Authentication.requiredToken, Authentication.isTeacher], kelasController.updateKelasById);   //guru
v1.delete("/kelas/:id", [Authentication.requiredToken, Authentication.isTeacher], kelasController.hapusKelas);   //admin


//invitation
v1.get("/invitations", InvitationController.getInvitations);
v1.get("/invitation/:id", [Authentication.requiredToken], InvitationController.getInvitationById);
v1.get("/invitation/classes/:id", InvitationController.getInvitationByIdClass);
v1.post("/invitation", InvitationController.createInvitation);   //guru

v1.delete("/invitation/classes/:id", InvitationController.deleteInvitationByClass);   //guru
v1.delete("/invitation/:id", InvitationController.deleteInvitation);   //guru

//material
v1.get("/materials", MaterialController.getMaterials); //admin
v1.get("/material/:id", MaterialController.getMaterialById);
v1.get("/material/classes/:id", MaterialController.getMaterialByclassId);
v1.post("/material", upload.single("book"), MaterialController.createMaterial);   //guru
v1.put("/material/:id", upload.single("book"), MaterialController.updateMaterialById);   //guru
v1.delete("/material/:id", MaterialController.deleteMaterial);   //guru


//question
v1.get("/questions", QuestionController.getQuestions);
v1.get("/question/:id", QuestionController.getQuestionById);
v1.get("/questions/achievement/:id", QuestionController.getByAchievementId);
v1.get("/questions/class/:id", QuestionController.getQuestionByClassId);
v1.post("/question", QuestionController.createQuestion);   //guru
v1.post("/questions", QuestionController.createBulkQuestion);   //guru
v1.put("/question/:id", QuestionController.updateQuestionById);   //guru
v1.delete("/question/:id", QuestionController.deleteQuestion);   //guru

//student
v1.get("/students", StudentController.getStudents);
v1.get("/student/:id", StudentController.getStudentById);
v1.get("/students/invitation/:id", StudentController.getStudentsByInvitationId);
v1.get("/students/class/:id", StudentController.getStudentsByClassId);
v1.get("/students/classes", [Authentication.requiredToken, Authentication.isStudent], StudentController.getClassesStudent);
v1.post("/student", [Authentication.requiredToken, Authentication.isStudent], StudentController.createStudent);   //guru
v1.put("/student/:id", StudentController.updateStudentById);   //guru
v1.delete("/student/:id", StudentController.deleteStudent);   //guru
v1.delete("/student", [Authentication.requiredToken, Authentication.isStudent], StudentController.deleteStudentByUser);   //siswa

//role
v1.get("/roles", RoleController.getRoles);
v1.get("/role/:id", RoleController.getRoleById);

//USER
v1.post("/login", userController.loginUser);
v1.post("/register", userController.registerUser);
v1.put("/profile", upload.single("image"), [Authentication.requiredToken], userController.updateProfile);
v1.get("/profile", [Authentication.requiredToken], userController.profile);
v1.get("/user/:id", [Authentication.requiredToken], userController.getUserById);
v1.get("/users", [Authentication.requiredToken], userController.getUsers);
v1.get("/logout", [Authentication.requiredToken], userController.logoutUser);


module.exports = v1;
