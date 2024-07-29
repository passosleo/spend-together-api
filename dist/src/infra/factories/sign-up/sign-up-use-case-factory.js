"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpUseCaseFactory = void 0;
const sign_up_use_case_1 = require("../../../application/use-cases/sign-up/sign-up-use-case");
const user_repository_prisma_1 = require("../../data/repositories/user-repository-prisma");
const helpers_1 = require("../../helpers");
const jwt_service_1 = require("../../services/auth/jwt-service");
const mail_service_1 = require("../../services/mail/mail-service");
class SignUpUseCaseFactory {
    static create() {
        const userRepository = new user_repository_prisma_1.UserRepositoryPrisma();
        const mailService = new mail_service_1.MailService();
        const tokenService = new jwt_service_1.JWTService();
        const helpers = new helpers_1.Helpers();
        const sut = new sign_up_use_case_1.SignUpUseCase(userRepository, mailService, tokenService, helpers);
        return sut;
    }
}
exports.SignUpUseCaseFactory = SignUpUseCaseFactory;
