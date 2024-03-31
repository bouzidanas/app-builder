import { WebContainer } from "@webcontainer/api";

const reportOutput = (output: string) => {
    console.log(output);
}

window.addEventListener("load", async () => {
    reportOutput("Booting WebContainer...");
    const container = await WebContainer.boot();
    reportOutput("WebContainer booted!");
});