import { JWT_TOKEN } from "@repo/backend-common/config";
import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";


export const loginmiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token  = req.headers.authorization?.split(" ")[1];

    const decoded  = jwt.verify(token! , JWT_TOKEN)
    if (decoded) {
        //@ts-ignore
        req.userId  = decoded.userId;
        next();
    }else{
        res.status(401).json({ message: "Unauthorized" });
    }

}