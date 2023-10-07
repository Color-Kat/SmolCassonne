/**
 * Format Date object to date string in certain format.
 *
 * @param date Date object
 * @param format format of date
 * @param locale locale of date
 */
export function formatDate(date: Date, format: string = 'd-m-Y', locale: string = 'ru'): string {
    const map = {
        d: date.getDate().toString().padStart(2, '0'), // 2-digit day
        j: date.getDate().toString(), // Day without 0 before
        D: date.toLocaleDateString(locale, { weekday: 'short' }), // Short week name
        l: date.toLocaleDateString(locale, { weekday: 'long' }), // Full week name
        m: (date.getMonth() + 1).toString().padStart(2, '0'), // 2-digit month
        n: (date.getMonth() + 1).toString(), // Month number without 0 before
        M: date.toLocaleDateString(locale, { month: 'short' }), // Short month name
        F: date.toLocaleDateString(locale, { month: 'long' }), // Long month name
        y: date.getFullYear().toString().slice(-2), // 2-digit year number
        Y: date.getFullYear().toString(), // Full year number
        h: date.getHours().toString().padStart(2, '0'), // 2-digit hours
        H: date.getHours().toString(), // Hours without 0 before
        i: date.getMinutes().toString().padStart(2, '0'), // 2-digit minutes
        s: date.getSeconds().toString().padStart(2, '0'), // 2-digit seconds
    };

    return format.replace(/(d|j|D|l|m|n|M|F|y|Y|h|H|i|s)/g, (match) => map[match as keyof typeof map]);
}

/**
 * Format Date string to date string in certain format.
 *
 * @param dateString
 * @param format
 */
export function formatDateString(dateString: string, format: string): string {
    return formatDate(new Date(Date.parse(dateString)), format);
}