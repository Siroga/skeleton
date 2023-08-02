import log from './logger';
//import Email from './models/Email.model';
import EmailProvider from './services/EmailProvider';
import SendGridProvider from './services/EmailProviders/SendGridProvider';
import { IEmailData } from './types/types';

const emailProvider = new EmailProvider();

//emailProvider.use(new SendGridProvider());


//Just test example
setInterval(async () => {
    log.info('Beginning to send emails');
    const emailData: IEmailData = {
      from: '',
      to: [''],
      subject: '',
      html: '',
    };
    //await emailProvider.send(emailData);
    log.info('Everything is sent');
}, 60000);


//Should be send Emails from DB
// sequlize
//     .authenticate()
//     .then(async () => {
//         log.info('Database connected');
//         setInterval(async () => {
//             log.info('Beginning to send emails');
//             await Email.sendSequentially(emailProvider);
//             log.info('Everything is sent');
//         }, 60000);
//     })
//     .catch((e: any) => {
//         log.error(e.message);
//     });
