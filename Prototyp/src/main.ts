
import express = require("express");
import { static as serveStatic } from "express";
import { join } from "path";

const path = (...str: string[]) => join(__dirname, "..", ...str);

export async function main(args: string[]) {
    const port = parseInt(args[2], 10);
    const app = express();

    app.use(serveStatic(path("html")));

    console.log(`Starting WebServer on port ${port}`)
    app.listen(port);
}