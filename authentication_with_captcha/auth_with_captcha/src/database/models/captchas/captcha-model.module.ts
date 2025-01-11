import { Global, Module } from "@nestjs/common";
import { CaptchaRepository } from "./captcha.repository";


const providers = [CaptchaRepository]

@Global()
@Module({
    providers,
    exports: providers
})

export class CaptchaModelModule {}
