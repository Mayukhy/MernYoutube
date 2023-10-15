import jwt from "jsonwebtoken";

export const verifyToken = (req, res,next) => {
  const token = req.cookies.access_token;
  if (!token)             
{  res.status(401);
  throw new Error("You are not a valid user");
}

  jwt.verify(token, 'test', (err, user) => {
    if (err) {  
      res.status(403);
        throw new Error("Invalid Token");
      }
    req.user = user;
    next()
  });
};