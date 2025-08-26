export const PORT = process.env.port ?? 3000;

export const JWT_SECRET = process.env.LC_JWT_SECRET ?? '';

export const FORM_SUBMITTED_EMAILS = process.env.LC_FORM_SUBMITTED_EMAIL?.split(',') ?? [];
export const RECORD_EMAILS = process.env.LC_RECORD_KEEPING_EMAILS?.split(',') ?? [];
export const VERIFICATION_SENDER_EMAIL = process.env.LC_VERIFICATION_SENDER_EMAIL ?? 'verification@stldsa.org';
export const VERIFICATION_SENDER_NAME = process.env.LC_VERIFICATION_SENDER_NAME ?? 'STL DSA Membership Verification';

export const GENERIC_SENDER_EMAIL = process.env.LC_VERIFICATION_SENDER_EMAIL ?? 'convention.dashboard@stldsa.org';
export const GENERIC_SENDER_NAME = process.env.LC_VERIFICATION_SENDER_NAME ?? 'Local Convention Dashboard';

export const SENDGRID_TOKEN = process.env.LC_SENDGRID_TOKEN ?? '';

export const SLACK_TOKEN = process.env.LC_SLACK_TOKEN ?? '';