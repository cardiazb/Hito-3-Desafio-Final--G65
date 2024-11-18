const checkCredenciales = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Debe proporcionar email y password" });
    }
    next();
  };
  
  module.exports = { checkCredenciales };