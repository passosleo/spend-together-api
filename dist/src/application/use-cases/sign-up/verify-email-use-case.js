"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyEmailUseCase = void 0;
const exception_1 = require("../../../infra/exception");
class VerifyEmailUseCase {
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
        await this.userRepository.update(userId, { emailVerified: true });
    }
}
exports.VerifyEmailUseCase = VerifyEmailUseCase;
