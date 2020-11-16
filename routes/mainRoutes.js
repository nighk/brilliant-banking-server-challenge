import fs from "fs";

import { isAuthenticated } from "../utils/authentication.js";
import { sleep } from "../utils/helpers.js";

const fsPromises = fs.promises;

/**
 * Main routes
 *
 * @param app The express application server
 * @param passport The passport login authentification
 */
export default (app, passport) =>
{
    /**
     * Process the login form, using passport authentification
     */
    app.post("/login/", (req, res) =>
    {
        passport.authenticate("local", function(err, user)
        {
            if(err) return res.status(500).send(err);
            if(!user) return res.status(403).send("Invalid login credentials provided");

            req.logIn(user, function(err)
            {
                if(err) return res.status(500).send(err);

                return res.send(`Logged in as: ${user.username}`);
            });
        })(req, res);
    });

    /**
     * Logout the user
     */
    app.get("/logout/", (req, res) =>
    {
        res.clearCookie("session");
        res.send("Logged out");
    });

    /**
     * Get the currently logged in users details
     */
    app.get("/user/", isAuthenticated, (req, res) =>
    {
        res.send(req.user);
    });
    
    /**
     * Get account list
     */
    app.get("/accounts", isAuthenticated, async (req, res) =>
    {   
        await sleep(1000);

        const randomInt = Math.floor(Math.random() * 5);

        if(randomInt === 0) {
            res.status(500).send("Unknown server error occured");
        } else {
            const data = await fsPromises.readFile("./data/accounts.json", "utf-8");
            res.send(data);
        }
    });

    /**
     * Get account list
     */
    app.get("/accountDetails/:id", isAuthenticated, async (req, res) =>
    {   
        await sleep(1000);

        const transactions = JSON.parse(await fsPromises.readFile("./data/transactions.json", "utf-8"));
        const transactionsForAccount = transactions[req.params.id];

        if(!transactionsForAccount) {
            res.status(500).send(`No transaction information for the account ID provided (${req.params.id}), was the id correct?`)
        }

        res.send(transactionsForAccount);
    });
}