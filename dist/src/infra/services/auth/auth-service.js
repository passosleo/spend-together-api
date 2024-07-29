"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_mapper_1 = require("../../data/mappers/user-mapper");
const exception_1 = require("../../exception");
class AuthService {
    userRepository;
    helpers;
    constructor(userRepository, helpers) {
        this.userRepository = userRepository;
        this.helpers = helpers;
    }
    async authenticate(email, password) {
        const user = await this.userRepository.findByUniqueKey({ email });
        if (!user) {
            throw new exception_1.Exception('NOT_FOUND', 'User not found');
        }
        const { password: hashedPassword } = user;
        const isValidPassword = await this.helpers.password.validateHashedPassword(password, hashedPassword);
        if (!isValidPassword) {
            throw new exception_1.Exception('UNAUTHORIZED', 'Invalid password');
        }
        return user_mapper_1.UserMapper.toAccount(user);
    }
}
exports.AuthService = AuthService;
