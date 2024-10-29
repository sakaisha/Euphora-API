export default function serverErrorsHandler(response, error) {
    console.error('Server Error:', error);
    return response.status(500).json({
        status: "error",
        message: "An internal server error occurred.",
        error: error.message
    });
}
