/**
 * Template for a user object
 */
export default class User {
    constructor(username) {
        if(!username) {
            throw "You can't create a User object without a username!";
        }

        this.username = username;
    }
}
