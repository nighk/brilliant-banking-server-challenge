/**
 * Sleep for the given amount of time,
 * returns a promise which is resolved once the time is up
 */
export const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
}