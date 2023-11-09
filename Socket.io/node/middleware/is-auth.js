module.exports = (req, res, next) => {
    // if (!req.session.isLoggedIn) {
    //     res.status(401).json({ status: 'false', message: 'Unauthorrized' })
    // }
    console.log(req.cookies);
    next();
}