import { Module } from '@nestjs/common';
import { CaptchasService } from './captchas.service';
import { CaptchasController } from './captchas.controller';
import { CaptchaModelModule } from 'src/database/models/captchas/captcha-model.module';

@Module({
  providers: [CaptchasService],
  controllers: [CaptchasController],
  imports: [CaptchaModelModule]
})
export class CaptchasModule {}
