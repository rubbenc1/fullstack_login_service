import { PartialModelObject } from "objection";
import { Captcha } from "./captcha.model";
import { ICaptchaRepository } from "./captcha.repository.interface";


export class CaptchaRepository implements ICaptchaRepository {
    async createCaptcha(captcha: PartialModelObject<Captcha>): Promise<Captcha> {
        return Captcha.query().insert(captcha)
    }

    async getCaptchaById(id: string): Promise<string> {
        const captcha = await Captcha.query().findById(id)
        return captcha?.text ?? null;
    }

    async deleteCaptcha(id: string): Promise<void> {
        await Captcha.query().deleteById(id);
    }
}