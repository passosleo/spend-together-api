"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendRecoverPasswordUseCaseFactory = void 0;
const send_recover_password_use_case_1 = require("../../../application/use-cases/sign-in/send-recover-password-use-case");
const user_repository_prisma_1 = require("../../data/repositories/user-repository-prisma");
const helpers_1 = require("../../helpers");
const mail_service_1 = require("../../services/mail/mail-service");
class SendRecoverPasswordUseCaseFactory {
    static create() {
        const userRepository = new user_repository_prisma_1.UserRepositoryPrisma();
        const mailService = new mail_service_1.MailService();
        const helpers = new helpers_1.Helpers();
        const sut = new send_recover_password_use_case_1.SendRecoverPasswordUseCase(userRepository, mailService, helpers);
        return sut;
    }
}
exports.SendRecoverPasswordUseCaseFactory = SendRecoverPasswordUseCaseFactory;
