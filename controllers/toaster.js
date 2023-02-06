function toaster(req, res, next) {
  res.locals.toastMessage = req.cookies.toastMessage;
  res.clearCookie("toastMessage");
  res.setToastMessage = (message) => {
    res.cookies("toastMessage", message)
  };
  next();
};

module.exports = { toaster };