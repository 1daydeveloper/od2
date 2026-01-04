// lib/email-validation.js
// Reusable email validation function to block reserved/system email addresses

const RESERVED_LOCAL_PARTS = new Set([
    'postmaster',
    'abuse',
    'hostmaster',
    'webmaster',
    'admin',
    'administrator',
    'mailer-daemon',
    'root',
    'hr',
    'support',
    'info',
    'contact',
    'noreply',
    'no-reply',
    'security',
    'help',
    'sales',
    'billing',
    'accounts',
    'accounting',
    'compliance',
    'devnull',
    'nobody',
    'system',
    'admin1',
    'admin2',
    'admin3',
    'alerts',
    'errors',
    'error',
    'daemon',
    'ftp',
    'news',
    'usenet',
    'noc',
    'no_reply',
    'do-not-reply',
    'donotreply',
    'bounce',
    'auto',
    'automated',
    'mailer',
    'newsletter',
    'subscribe',
    'unsubscribe',
    'testuser',
    'web',
    'www',
    'rootuser',
    'null',
    'void',
    'office',
    'team',
    'feedback',
    'inbox',
    'outbox',
    'register',
    'registration',
    'service',
    'services',
    'user',
    'users',
    'owner',
    'owners',
    'info1',
    'info2',
    'contactus',
    'webadmin',
    'webmaster1',
    'webmaster2',
    'webteam',
    'host',
    'host1',
    'host2',
    'host3',
    'monitor',
    'monitoring',
    'mon',
    'ops',
    'operator',
    'operations',
    'it',
    'itsupport',
    'itadmin',
    'rootadmin',
    'root1',
    'root2',
    'root3',
    'superuser',
    'supervisor',
    'sysadmin',
    'sys',
    'sysop',
    'tech',
    'technical',
    'techsupport',
    'support1',
    'support2',
    'support3',
    'helpdesk',
    'desk',
    'help1',
    'help2',
    'help3',
    'info@', // for accidental full address
]);

/**
 * Validates that an email address does not use a reserved local-part.
 * @param {string} email - The email address to validate.
 * @returns {object} - { valid: boolean, error?: string }
 */
function validateEmailNotReserved(email) {
    if (!email || typeof email !== 'string') {
        return { valid: false, error: 'Invalid email format' };
    }

    const trimmed = email.trim();
    if (!trimmed) {
        return { valid: false, error: 'Email cannot be empty' };
    }

    const atIndex = trimmed.indexOf('@');
    if (atIndex === -1 || atIndex === 0 || atIndex === trimmed.length - 1) {
        return { valid: false, error: 'Invalid email format' };
    }

    const localPart = trimmed.substring(0, atIndex).toLowerCase();

    // Check for disallowed symbols in local part
    const disallowedSymbols = /[<>()[\]\\,;:\s@"]/;
    if (disallowedSymbols.test(localPart)) {
        return { valid: false, error: 'Email contains disallowed symbols. Only letters, numbers, dots, hyphens, and underscores are allowed.' };
    }

    // Check if local part starts or ends with a dot or hyphen
    if (localPart.startsWith('.') || localPart.endsWith('.') || localPart.startsWith('-') || localPart.endsWith('-')) {
        return { valid: false, error: 'Email cannot start or end with a dot or hyphen.' };
    }

    // Check for consecutive dots
    if (localPart.includes('..')) {
        return { valid: false, error: 'Email cannot contain consecutive dots.' };
    }

    if (RESERVED_LOCAL_PARTS.has(localPart)) {
        return { valid: false, error: 'Reserved email addresses are not allowed. Please use a different email address.' };
    }

    return { valid: true };
}

export { validateEmailNotReserved, RESERVED_LOCAL_PARTS }