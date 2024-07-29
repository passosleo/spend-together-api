"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserAccountUseCase = void 0;
class DeleteUserAccountUseCase {
    authProvider;
    userRepository;
    constructor(authProvider, userRepository) {
        this.authProvider = authProvider;
        this.userRepository = userRepository;
    }
    async execute() {
        const userAccount = this.authProvider.getAuthenticatedUser();
        await this.userRepository.delete(userAccount.userId);
    }
}
exports.DeleteUserAccountUseCase = DeleteUserAccountUseCase;
