import sgMail from '@sendgrid/mail';

const host = process.env.SMTP_HOST;
const user = process.env.EMAIL_SERVICE_USER;
const clientId = process.env.SMTP_CLIENT_ID;
const clientSecret = process.env.SMTP_CLIENT_SECRET;
const accessToken = process.env.SMTP_ACCESS_TOKEN;
const refreshToken = process.env.SMTP_REFRESH_TOKEN;
const sgMailApiKey = process.env.SENDGRID_API_KEY! ?? 'SG.';
// const pass = process.env.EMAIL_SERVICE_PASS;

sgMail.setApiKey(sgMailApiKey);
export const sendGridService = sgMail;

//TODO: Reuse with native AWS SMTP mailer
// export const emailTransporter = createTransport({
//     host: host,
//     secure: true,
//     auth: {
//         type: 'OAuth2',
//         user: user,
//         clientId: clientId,
//         clientSecret: clientSecret,
//         accessToken: accessToken,
//         refreshToken: refreshToken,
//     },
// });
