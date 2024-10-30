import { verifyJWT } from "../controllers/AuthController.js";

// Add error handler function inside authMiddleware.js
function serverErrorsHandler(response, error) {
    console.error('Server Error:', error);
    return response.status(500).json({
        status: "error",
        message: "An internal server error occurred.",
        error: error.message
    });
}

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

        console.log("Token received for verification:", token);

        try {
            const user = await verifyJWT(token);

            if (user) {
                req.user = user;  
                console.log("Decoded user:", req.user); 
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
            return serverErrorsHandler(res, error); // Use error handler function
        }
    }
}