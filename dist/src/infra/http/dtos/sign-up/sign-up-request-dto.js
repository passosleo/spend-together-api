"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpRequestDTO = void 0;
/**
 * @openapi
 * components:
 *   schemas:
 *    SignUpRequestDTO:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *          minLength: 3
 *          maxLength: 50
 *          required: true
 *        name:
 *          type: string
 *          minLength: 3
 *          maxLength: 50
 *          required: false
 *        email:
 *          type: string
 *          format: email
 *          maxLength: 255
 *          required: true
 *        password:
 *          type: string
 *          minLength: 8
 *          required: true
 *        avatar:
 *          type: string
 *          format: uri
 *          required: false
 */
class SignUpRequestDTO {
    email;
    name;
    username;
    password;
    avatar;
    constructor(data) {
        this.email = data.email;
        this.name = data.name;
        this.username = data.username;
        this.password = data.password;
        this.avatar = data.avatar;
    }
    static create(data) {
        return new SignUpRequestDTO(data);
    }
}
exports.SignUpRequestDTO = SignUpRequestDTO;
