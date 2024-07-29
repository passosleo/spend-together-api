"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoverPasswordRequestDTO = void 0;
/**
 * @openapi
 * components:
 *   schemas:
 *    RecoverPasswordRequestDTO:
 *      type: object
 *      properties:
 *        newPassword:
 *          type: string
 *          minLength: 8
 *          required: false
 */
class RecoverPasswordRequestDTO {
    newPassword;
    token;
    constructor(data) {
        this.newPassword = data.newPassword;
        this.token = data.token;
    }
    static create(data) {
        return new RecoverPasswordRequestDTO(data);
    }
}
exports.RecoverPasswordRequestDTO = RecoverPasswordRequestDTO;
