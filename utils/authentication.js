/**
 * Checks if a user is authenticated
 */
export const isAuthenticated = (req, res, next) =>
{
    if(req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send("User not logged in");
    }
}