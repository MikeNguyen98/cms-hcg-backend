import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailUltiService {
  constructor(private mailerService: MailerService) {}

  // vesselsmoke1169@gmail.com	vesselsmoke5572	vesselsmoke1888@qq.com
  async sendUserResetpassword(
    userId: string,
    resetPasswordToken: string,
    email: string,
  ) {
    try {
      console.log('MAIL CHAY', email);
      await this.mailerService.sendMail({
        to: email,
        from: '"Support Team Vitamin Store" <support@vitamin-hunghang.com>',
        subject: 'Reset Password Vitamin Store! ',
        template: './product',
        context: {
          userId: userId,
          resetPasswordToken: resetPasswordToken,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
