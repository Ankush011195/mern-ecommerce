const adminMiddleware = (req, res, next) => {
  try {

    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({
        message: "Not authorized as admin",
      });
    }

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export default adminMiddleware;