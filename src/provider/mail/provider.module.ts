import {Module} from '@nestjs/common';
import {MailerModule} from '@nestjs-modules/mailer';
import {EmailConfigModule} from '../../config/mail/config.module';
import {EmailConfigService} from '../../config/mail/config.service';
import { join } from 'path';
import {HandlebarsAdapter} from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import {MailService} from './mail.service';

@Module({
    imports: [
        MailerModule.forRootAsync({
            imports: [EmailConfigModule],
            useFactory: async (emailConfigService: EmailConfigService) => ({
                transport: {
                    host: emailConfigService.host,
                    secure: emailConfigService.secure,
                    auth: {
                        user: emailConfigService.user,
                        pass: emailConfigService.password
                    }
                },
                defaults: {
                    from: emailConfigService.from
                },
                template: {
                    dir: join(__dirname, 'templates'),
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                }
            }),
            inject: [EmailConfigService]
        })
    ],
    providers: [MailService],
    exports: [MailService]
})
export class MailProviderModule {}
