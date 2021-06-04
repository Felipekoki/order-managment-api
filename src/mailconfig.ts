import { MailerOptions } from "@nestjs-modules/mailer";
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';


export const MailConfig: MailerOptions = {
    transport: {
        host: 'smtp.zoho.com',
        secure: false,
        auth: {
          user: 'username',
          pass: 'password',
        },
      },
      defaults: {
        from: '"No Reply" <username>',
      },
      template: {
        dir: __dirname + '/domain/assets/templates/order',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
}
