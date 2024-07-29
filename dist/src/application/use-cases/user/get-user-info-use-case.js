"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserInfoUseCase = void 0;
const exception_1 = require("../../../infra/exception");
const user_mapper_1 = require("../../../infra/data/mappers/user-mapper");
class GetUserInfoUseCase {
    authProvider;
    userRepository;
    constructor(authProvider, userRepository) {
        this.authProvider = authProvider;
        this.userRepository = userRepository;
    }
    async execute() {
        const userAccount = this.authProvider.getAuthenticatedUser();
        const user = await this.userRepository.findByUniqueKey({ userId: userAccount.userId });
        if (!user) {
            throw new exception_1.Exception('NOT_FOUND', 'User not found');
        }
        return user_mapper_1.UserMapper.toAccount(user);
    }
}
exports.GetUserInfoUseCase = GetUserInfoUseCase;
