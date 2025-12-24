import { jwtPayload } from "./generateToken.ts";

declare global {
    namespace Express {
        interface Request {
            user?: jwtPayload;
        }
    }
}

export {};