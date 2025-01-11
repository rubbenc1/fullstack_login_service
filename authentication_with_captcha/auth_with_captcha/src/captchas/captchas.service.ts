import { BadRequestException, Injectable } from '@nestjs/common';
import { CaptchaRepository } from 'src/database/models/captchas/captcha.repository';
import { CaptchaResponseDto } from './dtos/captcha_response.dto';
import * as svgCaptcha from 'svg-captcha'
import { plainToInstance } from 'class-transformer';
import { CaptchaInputDto } from './dtos/captcha_input.dto';

@Injectable()
export class CaptchasService {
    constructor(
        private readonly captchaRepository: CaptchaRepository
    ){}

    async generateCaptcha(): Promise<CaptchaResponseDto> {
        const captcha = svgCaptcha.create({
            size: 6,
            ignoreChars: '0oO1iI',
            noise: 3,
            color: true,
            background: '#ccf'
        });
        const expirationTime = new Date();
        expirationTime.setMinutes(expirationTime.getMinutes() + 5);

        const captchaRecord = {
            text: captcha.text,
            expires_at: expirationTime.toISOString(),
        };
        const savedCaptcha = await this.captchaRepository.createCaptcha(captchaRecord);
        return plainToInstance(CaptchaResponseDto, {
            id: savedCaptcha.id,
            svg: captcha.data,
        })
    }

    async validateCaptcha(captcha: CaptchaInputDto): Promise<void>{
        const captchaText = await this.captchaRepository.getCaptchaById(captcha.id);
        
        if (!captchaText){
            throw new BadRequestException('Captcha not found');
        }

        if (captchaText !== captcha.input) {
            throw new BadRequestException('Invalid captcha');
        }
    }
}
