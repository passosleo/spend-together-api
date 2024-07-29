"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendVerifyEmailRequestDTO = void 0;
/**
 * @openapi
 * components:
 *   schemas:
 *    SendVerifyEmailRequestDTO:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          format: email
 *          required: true
 */
class SendVerifyEmailRequestDTO {
    email;
    constructor(data) {
        this.email = data.email;
    }
    static create(data) {
        return new SendVerifyEmailRequestDTO(data);
    }
}
exports.SendVerifyEmailRequestDTO = SendVerifyEmailRequestDTO;
