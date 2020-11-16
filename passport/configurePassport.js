import { Strategy as LocalStrategy } from "passport-local";
import User from "../classes/User.js";

/**
 * Passport session setup, enabling users to login
 */
export default (passport) => {
    // The list of users who can login to the system
    const userList = [
        {
            username: "user",
            password: "ilovebanking"
        }
    ];

    /**
     * Serializes the user for the session
     */
    passport.serializeUser((user, done) =>
    {
        done(null, user.username);
    });

    /**
     * Deserialises the user information
     */
    passport.deserializeUser((username, done) =>
    {
         done(null, new User(username));
    });

    /**
     * Processes a login request
     */
    passport.use(new LocalStrategy((username, password, done) => 
    {
        for(let user of userList)
        {
            if(user.username === username && user.password === password)
            {
                // Login success, return successful user
                return done(null, new User(username));
            }
        }

        // Login failed, return error message
        return done(null, false);
    }));
};
