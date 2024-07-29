"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAccountDTO = void 0;
/**
 * @openapi
 * components:
 *   schemas:
 *     UserAccountDTO:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           format: uuid
 *         username:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         emailVerified:
 *           type: boolean
 *         avatar:
 *           type: string
 *         isEnabled:
 *           type: boolean
 *         isPublic:
 *           type: boolean
 *         receiveEmails:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
class UserAccountDTO {
    userId;
    email;
    emailVerified;
    name;
    username;
    avatar;
    receiveEmails;
    isPublic;
    isEnabled;
    createdAt;
    updatedAt;
    constructor(data) {
        this.userId = data.userId;
        this.email = data.email;
        this.emailVerified = data.emailVerified;
        this.name = data.name;
        this.username = data.username;
        this.avatar = data.avatar;
        this.isEnabled = data.isEnabled;
        this.isPublic = data.isPublic;
        this.receiveEmails = data.receiveEmails;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
    static create(data) {
        return new UserAccountDTO(data);
    }
}
exports.UserAccountDTO = UserAccountDTO;
