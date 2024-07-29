"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserInfoUseCaseFactory = void 0;
const get_user_info_use_case_1 = require("../../../application/use-cases/user/get-user-info-use-case");
const auth_provider_1 = require("../../../application/providers/auth/auth-provider");
const user_repository_prisma_1 = require("../../data/repositories/user-repository-prisma");
class GetUserInfoUseCaseFactory {
    static create(userAccount) {
        const authProvider = new auth_provider_1.AuthProvider(userAccount);
        const userRepository = new user_repository_prisma_1.UserRepositoryPrisma();
        const sut = new get_user_info_use_case_1.GetUserInfoUseCase(authProvider, userRepository);
        return sut;
    }
}
exports.GetUserInfoUseCaseFactory = GetUserInfoUseCaseFactory;
