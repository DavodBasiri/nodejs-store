const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { UserModel } = require("../models/users");
const {
  ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
} = require("./constans");
const redisClient = require("./init_redis");
const fs = require("fs");
const path = require("path");
function RandomNumberGenerator() {
  return Math.floor(Math.random() * 90000 + 10000);
}
function SignAccessToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId);
    const payload = {
      mobile: user.mobile,
      userID: user._id,
    };
    const secret = ACCESS_TOKEN_SECRET_KEY;
    const option = {
      expiresIn: "24h",
    };
    JWT.sign(payload, secret, option, (err, token) => {
      if (err) reject(createError.InternalServerError("Server Error "));
      resolve(token);
    });
  });
}

function SignRefreshToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId);
    const payload = {
      mobile: user.mobile,
      userID: user._id,
    };
    const secret = REFRESH_TOKEN_SECRET_KEY;
    const option = {
      expiresIn: "1y",
    };
    JWT.sign(payload, secret, option, async (err, token) => {
      if (err) reject(createError.InternalServerError("Server Error "));
      await redisClient.SETEX(String(userId), 31536000, token);

      resolve(token);
    });
  });
}
async function VerifyRefreshToken(token) {
  return new Promise(async (resolve, reject) => {
    JWT.verify(token, REFRESH_TOKEN_SECRET_KEY, async (err, payload) => {
      if (err) reject(createError.Unauthorized("Please login"));
      const { mobile } = payload || {};
      const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });
      if (!user) reject(createError.Unauthorized("User Not Found"));
      const refreshToken = await redisClient.get(
        String(user._id) || "defulat_key"
      );
      if (token === refreshToken) return resolve(mobile);
      reject(createError.Unauthorized("Please login"));
    });
  });
}
function deleteFileInPublic(fileAddress) {
  const pathFile = path.join(__dirname, "..", "..", "public", fileAddress);
  if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile);
}
function listOfImagesFromRequest(files, fileUploadPath) {
  if (files?.length > 0) {
   
    return files.map((file) => path.join(fileUploadPath, file.filename).replace(/[\\\\]/gm, "/")
    );
  }
  return [];
}
module.exports = {
  RandomNumberGenerator,
  SignAccessToken,
  SignRefreshToken,
  VerifyRefreshToken,
  deleteFileInPublic,
  listOfImagesFromRequest,
};
