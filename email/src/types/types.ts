export interface IEmailProvider {
    send(emailData: IEmailData): Promise<boolean>;
}

export interface IEmailData {
    from: string | undefined;
    to: string[];
    subject: string;
    html: string;
    cc?: string[];
    bcc?: string[];
}
