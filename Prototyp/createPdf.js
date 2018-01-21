var markdownpdf = require("markdown-pdf");

markdownpdf().from("README.md").to("Gruppe8_Dienstplan_Prototyp.pdf", function () {
    console.log("Done!");
});