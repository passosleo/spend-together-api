"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendVerifyEmailUseCaseFactory = void 0;
const send_verify_email_use_case_1 = require("../../../application/use-cases/sign-up/send-verify-email-use-case");
const user_repository_prisma_1 = require("../../data/repositories/user-repository-prisma");
const helpers_1 = require("../../helpers");
const mail_service_1 = require("../../services/mail/mail-service");
class SendVerifyEmailUseCaseFactory {
    static create() {
        const userRepository = new user_repository_prisma_1.UserRepositoryPrisma();
        const mailService = new mail_service_1.MailService();
        const helpers = new helpers_1.Helpers();
        const sut = new send_verify_email_use_case_1.SendVerifyEmailUseCase(userRepository, mailService, helpers);
        return sut;
    }
}
exports.SendVerifyEmailUseCaseFactory = SendVerifyEmailUseCaseFactory;
