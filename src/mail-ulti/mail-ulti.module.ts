import { Module } from '@nestjs/common';
import { MailUltiService } from './mail-ulti.service';
import { MailUltiController } from './mail-ulti.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        secure: true,
        auth: {
          user: 'duchieu307@gmail.com',
          pass: 'qdnoezqtscyiqtol',
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [MailUltiController],
  providers: [MailUltiService],
  exports: [MailUltiService],
})
export class MailUltiModule {}
