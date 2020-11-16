/**
 * Initial entrypoint for the application
 */
import express from "express";
import passport from "passport";
import cookieSession from "cookie-session";
import ip from "ip";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";

import mainRoutes from "./routes/mainRoutes.js";
import configurePassport from "./passport/configurePassport.js";

const app = express();

// Set the name of the application process, used in the stop script in the package.json
process.title = "brilliant-banking-server";

// Secures http headers to prevent potential security issues
app.use(helmet());

// Needed to get information from html forms
app.use(express.json());

// Enable the use of cookies for persistent login sessions
app.use(cookieSession(
{
    name: "session",
    key: "brilliant-banking-login-cookie",
    secret: "M0xcUjFwFMU4KsWqWk9jpS48fgkzLo7Q",
    secure: false,
    httpOnly: false,
    maxAge: 1000 * 60 * 60 * 24 * 30 // 1 month
}));

app.use(cookieParser())

// Enable CORS
app.use(cors({ 
    origin: "http://localhost:3000",
    credentials: true
}));

// Configure passport with defined strategies from ./config/passport
configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// Load custom routes
mainRoutes(app, passport);

const host = ip.address();
const port = 8080;

http.createServer(app).listen(port);
console.log("Server started at http://%s:%s", host, port);
