"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoverPasswordUseCase = void 0;
const exception_1 = require("../../../infra/exception");
class RecoverPasswordUseCase {
    userRepository;
    helpers;
    constructor(userRepository, helpers) {
        this.userRepository = userRepository;
        this.helpers = helpers;
    }
    async execute(data) {
        const { userId, expiresAt } = this.helpers.encryption.decrypt(data.token);
        if (!userId || this.helpers.date.isExpiredDate(expiresAt)) {
            throw new exception_1.Exception('BAD_REQUEST', 'Invalid token');
        }
        if (!data.newPassword) {
            // Maybe should return user data
            return;
        }
        const hashedPassword = await this.helpers.password.hashPassword(data.newPassword);
        await this.userRepository.update(userId, { password: hashedPassword });
    }
}
exports.RecoverPasswordUseCase = RecoverPasswordUseCase;
