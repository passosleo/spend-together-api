"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInUseCaseFactory = void 0;
const sign_in_use_case_1 = require("../../../application/use-cases/sign-in/sign-in-use-case");
const user_repository_prisma_1 = require("../../data/repositories/user-repository-prisma");
const helpers_1 = require("../../helpers");
const auth_service_1 = require("../../services/auth/auth-service");
const jwt_service_1 = require("../../services/auth/jwt-service");
class SignInUseCaseFactory {
    static create() {
        const userRepository = new user_repository_prisma_1.UserRepositoryPrisma();
        const helpers = new helpers_1.Helpers();
        const authService = new auth_service_1.AuthService(userRepository, helpers);
        const tokenService = new jwt_service_1.JWTService();
        const sut = new sign_in_use_case_1.SignInUseCase(authService, tokenService);
        return sut;
    }
}
exports.SignInUseCaseFactory = SignInUseCaseFactory;
