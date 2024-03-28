const {
  registerService,
  loginService,
} = require("../../services/user.service");

const registerController = async (req, res) => {
  const payload = req.body;
  try {
    const response = await registerService(payload);
    if (response.status === 400) {
      return res
        .status(400)
        .json({ message: response.message, data: response.data });
    }
    res.status(response.status).json({
      data: response.data,
      message: response.message,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginController = async (req, res) => {
  const payload = req.body;
  try {
    const response = await loginService(payload);
    
    if (response.status === 400) {
      return res
        .status(400)
        .json({ message: response.message, data: response.data });
    }
    res.status(response.status).json({
      data: response.data,
      message: response.message,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { loginController, registerController };
