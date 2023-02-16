const secretkey = "secretkey"
const jwt = require("jsonwebtoken");
function checkAuth(req, res, next) {
    try {

        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== "undefined") {
            const bearer = bearerHeader.split(" ");
            const token = bearer[1];
            jwt.verify(token, secretkey, (err, authData) => {
                if (err) {
                    return res.json({
                        message: "Invalid token"
                    })
                } else {
                    // console.log(authData)
                    req['userData'] = authData.user;

                    next();
                }

            });
        }
        else {
            return res.json({
                message: "Token not found"
            })
        }
    }
    catch (e) {
        return res.json({
            message: "Invalid token"
        })
    }
}


exports.checkAuth = checkAuth