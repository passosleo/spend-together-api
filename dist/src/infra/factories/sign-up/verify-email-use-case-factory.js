"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyEmailUseCaseFactory = void 0;
const verify_email_use_case_1 = require("../../../application/use-cases/sign-up/verify-email-use-case");
const user_repository_prisma_1 = require("../../data/repositories/user-repository-prisma");
const helpers_1 = require("../../helpers");
class VerifyEmailUseCaseFactory {
    static create() {
        const userRepository = new user_repository_prisma_1.UserRepositoryPrisma();
        const helpers = new helpers_1.Helpers();
        const sut = new verify_email_use_case_1.VerifyEmailUseCase(userRepository, helpers);
        return sut;
    }
}
exports.VerifyEmailUseCaseFactory = VerifyEmailUseCaseFactory;
