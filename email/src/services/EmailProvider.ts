import { IEmailData, IEmailProvider } from '../types/types';

class EmailProvider {
    provider?: IEmailProvider;

    use(provider: IEmailProvider) {
        this.provider = provider;
    }

    async send(emailData: IEmailData) {
        if (!this.provider) {
            console.error(`Email provider not found!`);
            return false;
        }

        return await this.provider.send.apply(null, [emailData]);
    }
}

export default EmailProvider;
