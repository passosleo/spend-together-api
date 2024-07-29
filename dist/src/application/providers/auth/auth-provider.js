"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProvider = void 0;
class AuthProvider {
    userAccount;
    constructor(userAccount) {
        this.userAccount = userAccount;
    }
    getAuthenticatedUser() {
        return this.userAccount;
    }
}
exports.AuthProvider = AuthProvider;
