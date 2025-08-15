export const validateUser = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
  return res.status(400).json({
    status: "error",
    message: "Request body is missing. Please send user details."
  });
}


  const { name, email, password } = req.body;

  if (!name || name.trim().length <= 2) {
    return res.status(400).json({
      status: "error",
      field: "name",
      message: "Name must be at least 3 characters long."
    });
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({
      status: "error",
      field: "email",
      message: "Please provide a valid email address."
    });
  }

 const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!password || !passwordRegex.test(password)) {
    return res.status(400).json({
      status: "error",
      field: "password",
      message:
        "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character."
    });
  }

 if (!req.file) {
    return res.status(400).json({
      status: "error",
      field: "profileImage",
      message: "Please provide a profile image."
    });
  }

  next();
};
