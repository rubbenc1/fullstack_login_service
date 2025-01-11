import { PartialModelObject } from "objection";
import { Captcha } from "./captcha.model";

export interface ICaptchaRepository {
    createCaptcha(captcha: PartialModelObject<Captcha>): Promise<Captcha>;
    getCaptchaById(id: string): Promise<string>;
    deleteCaptcha(id: string): Promise<void>;
}