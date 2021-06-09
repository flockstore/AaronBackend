import {Injectable} from '@nestjs/common';
import {MailerService} from '@nestjs-modules/mailer';
import {from, Observable} from 'rxjs';

@Injectable()
export class MailService {

    constructor(private mailerService: MailerService) {}

    /**
     * Send an email from the template repository to an user
     * @param template to send
     * @param to the mail that will be sent
     * @param subject to be marked
     * @param context to be replaced
     */
    public sendMail(
        template: string,
        to: string,
        subject: string,
        context: any
    ): Observable<void> {
        return from(this.mailerService.sendMail({
            to,
            subject,
            template,
            context
        }));
    }

}
