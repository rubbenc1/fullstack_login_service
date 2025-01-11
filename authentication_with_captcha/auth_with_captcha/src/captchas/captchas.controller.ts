import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CaptchasService } from './captchas.service';
import { CaptchaInputDto } from './dtos/captcha_input.dto';
import { SuccessfulResponseDto } from './dtos/successful_response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CaptchaResponseDto } from './dtos/captcha_response.dto';

@ApiTags('Captchas')
@Controller('captchas')
export class CaptchasController {
    constructor(
        private readonly captchaService: CaptchasService
    ) {}

    @ApiOperation({ summary: 'Generate a captcha' })
    @ApiResponse({ status: 201, type: CaptchaResponseDto, description: 'Captcha generated successfully' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @Post('generate')
    async generateCaptcha(): Promise<CaptchaResponseDto> {
        return this.captchaService.generateCaptcha();
    }

    @ApiOperation({ summary: 'Validate a captcha' })
    @ApiResponse({ status: 200, type: SuccessfulResponseDto, description: 'Captcha validated successfully' })
    @ApiResponse({ status: 400, description: 'Invalid captcha input' })
    @ApiResponse({ status: 404, description: 'Captcha not found or expired' })
    @Post('validate')
    @HttpCode(200)
    async validateCaptcha(
        @Body() captcha: CaptchaInputDto
    ): Promise<SuccessfulResponseDto> {
        await this.captchaService.validateCaptcha(captcha);
        return { message: 'Captcha validated successfully' };
    }
}
