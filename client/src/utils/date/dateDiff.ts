/**
 * Calculate diff between two Date objects.
 *
 * @param startDate
 * @param endDate
 */
export function dateDiff(startDate: Date, endDate: Date): {
    diffYears: number;
    diffMonths: number;
    diffDays: number;
    diffHours: number;
    diffMinutes: number;
    diffSeconds: number;
} {
    const diffMilliseconds = endDate.getTime() - startDate.getTime();

    const diffSeconds = Math.floor(diffMilliseconds / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();
    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth();

    let diffYears = endYear - startYear;
    let diffMonths = endMonth - startMonth;

    if (diffMonths < 0) {
        diffYears--;
        diffMonths += 12;
    }

    return {
        diffYears,
        diffMonths,
        diffDays,
        diffHours,
        diffMinutes,
        diffSeconds,
    };
}
