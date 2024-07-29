"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserUseCase = void 0;
const user_mapper_1 = require("../../../infra/data/mappers/user-mapper");
class UpdateUserUseCase {
    authProvider;
    userRepository;
    constructor(authProvider, userRepository) {
        this.authProvider = authProvider;
        this.userRepository = userRepository;
    }
    async execute(data) {
        const userAccount = this.authProvider.getAuthenticatedUser();
        const user = await this.userRepository.update(userAccount.userId, data);
        return user_mapper_1.UserMapper.toAccount(user);
    }
}
exports.UpdateUserUseCase = UpdateUserUseCase;
