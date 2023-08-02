import { MailDataRequired } from '@sendgrid/mail';
import { sendGridService } from '../../mailer';
import { IEmailData, IEmailProvider } from '../../types/types';

class SendGridProvider implements IEmailProvider {
    async send(emailData: IEmailData) {
        await sendGridService.send(emailData as MailDataRequired);
        return true;
    }
}

export default SendGridProvider;
