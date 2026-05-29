export const THROTTLER_CONFIG = {
    GLOBAL: {
        limit: 100,
        ttl: 60000 * 5,
    },
    LOGIN: {
        limit: 5,
        tll: 60000
    },
    REGISTER: {
        limit: 3,
        tll: 60000 * 15
    },
    PASSWORD_RESET: {
        limit: 1,
        ttl: 60000 * 30
    }
}