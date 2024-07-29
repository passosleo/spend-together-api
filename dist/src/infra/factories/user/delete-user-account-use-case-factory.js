"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserAccountUseCaseFactory = void 0;
const auth_provider_1 = require("../../../application/providers/auth/auth-provider");
const delete_user_account_use_case_1 = require("../../../application/use-cases/user/delete-user-account-use-case");
const user_repository_prisma_1 = require("../../data/repositories/user-repository-prisma");
class DeleteUserAccountUseCaseFactory {
    static create(userAccount) {
        const authProvider = new auth_provider_1.AuthProvider(userAccount);
        const userRepository = new user_repository_prisma_1.UserRepositoryPrisma();
        const sut = new delete_user_account_use_case_1.DeleteUserAccountUseCase(authProvider, userRepository);
        return sut;
    }
}
exports.DeleteUserAccountUseCaseFactory = DeleteUserAccountUseCaseFactory;
