function isAdmin(req, res, next) {
  const authData = req.user;

  if (authData.role !== "superadmin") {
    return res.status(403).json({ message: "Not Authorized. Not an admin" });
  }

  next();
}

export default isAdmin;
