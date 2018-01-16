import { Request, Response } from "express";

export function login(req: Request, res: Response) {

}

export function isLoggedIn(req: Request, res: Response) {
    res.send({
        success: false,
        error: "Not logged in."
    });
}