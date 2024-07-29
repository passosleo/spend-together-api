"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.CreateUserData = void 0;
class CreateUserData {
    userId;
    email;
    emailVerified;
    name;
    username;
    password;
    avatar;
    receiveEmails;
    isPublic;
    isEnabled;
    createdAt;
    updatedAt;
}
exports.CreateUserData = CreateUserData;
class User {
    userId;
    email;
    emailVerified;
    name;
    username;
    password;
    avatar;
    receiveEmails;
    isPublic;
    isEnabled;
    createdAt;
    updatedAt;
    constructor(data) {
        this.userId = data.userId;
        this.email = data.email;
        this.emailVerified = data.emailVerified ?? false;
        this.name = data.name ?? null;
        this.username = data.username;
        this.password = data.password;
        this.avatar = data.avatar ?? null;
        this.receiveEmails = data.receiveEmails ?? true;
        this.isPublic = data.isPublic ?? true;
        this.isEnabled = data.isEnabled ?? true;
        this.createdAt = data.createdAt ?? new Date();
        this.updatedAt = data.updatedAt ?? new Date();
    }
    static create(data) {
        return new User(data);
    }
}
exports.User = User;
