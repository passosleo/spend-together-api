"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const user_1 = require("../../../domain/entities/user");
const user_account_dto_1 = require("../../../domain/dtos/user/user-account-dto");
class UserMapper {
    static toDomain(data) {
        return user_1.User.create(data);
    }
    static toEntity(data) {
        return {
            userId: data.userId,
            name: data.name,
            username: data.username,
            email: data.email,
            password: data.password,
            avatar: data.avatar,
            emailVerified: data.emailVerified,
            receiveEmails: data.receiveEmails,
            isPublic: data.isPublic,
            isEnabled: data.isEnabled,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        };
    }
    static toPartialEntity(data) {
        return {
            userId: data.userId,
            name: data.name,
            username: data.username,
            email: data.email,
            password: data.password,
            avatar: data.avatar,
            emailVerified: data.emailVerified,
            receiveEmails: data.receiveEmails,
            isPublic: data.isPublic,
            isEnabled: data.isEnabled,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        };
    }
    static toAccount(data) {
        return user_account_dto_1.UserAccountDTO.create(data);
    }
}
exports.UserMapper = UserMapper;
