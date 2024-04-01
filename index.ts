// import { WebContainer } from "@webcontainer/api";

// const reportOutput = (output: string) => {
//     console.log(output);
// }

// window.addEventListener("load", async () => {
//     reportOutput("Booting WebContainer...");
//     const container = await WebContainer.boot();
//     reportOutput("WebContainer booted!");

//     const process = await container.spawn("node", ["-v"]);

//     process.output.pipeTo(new WritableStream({
//         write(chunk) {
//             reportOutput("Process output: " + chunk);
//         }
//     }));

//     if (await process.exit) {
//         reportOutput("Process failed and exited with code: " + process.exit);
//     } else {
//         reportOutput("Process succeeded and exited with code: " + process.exit);
//     }
// });