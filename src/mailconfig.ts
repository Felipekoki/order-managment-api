import { MailerOptions } from "@nestjs-modules/mailer";
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';


export const MailConfig: MailerOptions = {
    transport: {
        host: 'smtp.zoho.com',
        secure: false,
        auth: {
          user: 'digitalfile@camaleaosoft.com',
          pass: 'DigitalFile@2018',
        },
      },
      defaults: {
        from: '"No Reply" <digitalfile@camaleaosoft.com>',
      },
      template: {
        dir: __dirname + '/domain/assets/templates/order',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
}