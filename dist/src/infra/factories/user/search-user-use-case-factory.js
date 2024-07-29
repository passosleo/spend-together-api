"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchUserUseCaseFactory = void 0;
const search_user_use_case_1 = require("../../../application/use-cases/user/search-user-use-case");
const auth_provider_1 = require("../../../application/providers/auth/auth-provider");
const user_repository_prisma_1 = require("../../data/repositories/user-repository-prisma");
class SearchUserUseCaseFactory {
    static create(userAccount) {
        const authProvider = new auth_provider_1.AuthProvider(userAccount);
        const userRepository = new user_repository_prisma_1.UserRepositoryPrisma();
        const sut = new search_user_use_case_1.SearchUserUseCase(authProvider, userRepository);
        return sut;
    }
}
exports.SearchUserUseCaseFactory = SearchUserUseCaseFactory;
