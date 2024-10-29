import { verifyJWT } from "../controllers/AuthController.js"; // Ensure correct named import

export default class AuthMiddleware {
    static async isAuthorized(req, res, next) {
        const bearer = req.headers.authorization;

        if (!bearer) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized",
                error: {
                    code: 401,
                    details: "Authorization token missing",
                },
            });
        }

        const token = bearer.split(" ")[1];

        if (!token) {
            return res.status(400).json({
                status: "error",
                message: "Invalid token",
                error: {
                    code: 400,
                    details: "Token is missing or malformed",
                },
            });
        }

        console.log("Token received for verification:", token); // Log the token for debugging

        try {
            const user = await verifyJWT(token);

            if (user) {
                req.user = user;  // Ensure this user object is valid
                console.log("Decoded user:", req.user); // Log for debugging
                next();
            } else {
                return res.status(400).json({
                    status: "error",
                    message: "Invalid token",
                    error: {
                        code: 400,
                        details: "Token verification failed",
                    },
                });
            }
        } catch (error) {
            console.error('Error verifying token:', error); // Log the error
            return res.status(500).json({
                status: "error",
                message: "Server error",
                error: {
                    code: 500,
                    details: error.message,
                },
            });
        }
    }
}