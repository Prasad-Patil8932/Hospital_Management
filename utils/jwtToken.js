export const generateToken = (user, message, statusCode, resp) => {
  const token = user.generateJwtToken();
  const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";
  resp
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
