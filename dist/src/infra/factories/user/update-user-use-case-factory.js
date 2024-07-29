"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserUseCaseFactory = void 0;
const update_user_use_case_1 = require("../../../application/use-cases/user/update-user-use-case");
const user_repository_prisma_1 = require("../../data/repositories/user-repository-prisma");
const auth_provider_1 = require("../../../application/providers/auth/auth-provider");
class UpdateUserUseCaseFactory {
    static create(userAccount) {
        const authProvider = new auth_provider_1.AuthProvider(userAccount);
        const userRepository = new user_repository_prisma_1.UserRepositoryPrisma();
        const sut = new update_user_use_case_1.UpdateUserUseCase(authProvider, userRepository);
        return sut;
    }
}
exports.UpdateUserUseCaseFactory = UpdateUserUseCaseFactory;
