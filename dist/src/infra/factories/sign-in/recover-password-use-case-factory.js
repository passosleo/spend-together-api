"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoverPasswordUseCaseFactory = void 0;
const recover_password_use_case_1 = require("../../../application/use-cases/sign-in/recover-password-use-case");
const user_repository_prisma_1 = require("../../data/repositories/user-repository-prisma");
const helpers_1 = require("../../helpers");
class RecoverPasswordUseCaseFactory {
    static create() {
        const userRepository = new user_repository_prisma_1.UserRepositoryPrisma();
        const helpers = new helpers_1.Helpers();
        const sut = new recover_password_use_case_1.RecoverPasswordUseCase(userRepository, helpers);
        return sut;
    }
}
exports.RecoverPasswordUseCaseFactory = RecoverPasswordUseCaseFactory;
