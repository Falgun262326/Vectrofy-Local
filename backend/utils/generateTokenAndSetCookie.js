import jwt from "jsonwebtoken";
export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  const Id = JSON.stringify({ userId });

  res.cookie("authToken", token, {
    // httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.cookie("userId", Id, {
    // httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    // secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return token;
};
