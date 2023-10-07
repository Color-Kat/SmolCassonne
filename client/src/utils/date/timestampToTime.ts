/**
 * Calculate time in format `Hours minutes` by timestamp number.
 *
 * @param timestamp
 */
export function timestampToTime(timestamp: number): string {
    let seconds = timestamp % 60;
    timestamp = (timestamp - seconds) / 60;
    let minutes = timestamp % 60;
    let hours = (timestamp - minutes) / 60;

    // Will display time in 10:30:23 format
    const formattedTime = hours + 'ч ' + minutes + 'мин';

    return formattedTime;
}
