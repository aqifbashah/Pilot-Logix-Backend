import jwt from "jsonwebtoken";

async function isAuth(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    // if no token return not autenticated
    if (!token) {
      return res.status(401).json({ message: "not authenticated" });
    }
    const decoded = jwt.verify(token, "pilotLogixSecured");
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json(error);
  }
}

export default isAuth;
