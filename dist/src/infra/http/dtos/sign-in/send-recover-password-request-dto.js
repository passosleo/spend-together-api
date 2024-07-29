"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendRecoverPasswordRequestDTO = void 0;
/**
 * @openapi
 * components:
 *   schemas:
 *    SendRecoverPasswordRequestDTO:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          format: email
 */
class SendRecoverPasswordRequestDTO {
    email;
    constructor(data) {
        this.email = data.email;
    }
    static create(data) {
        return new SendRecoverPasswordRequestDTO(data);
    }
}
exports.SendRecoverPasswordRequestDTO = SendRecoverPasswordRequestDTO;
