import { WebContainer } from "@webcontainer/api";
import './App.css'
import { useEffect, useRef, useState } from "react";

// const reportOutput = (output: string) => {
//     console.log(output);
// }

const CommandTerminal = () => {
  const [command, setCommand] = useState(''); // command state
  const [output, setOutput] = useState(''); // output state

  const containerRef = useRef<WebContainer | null>(null);

  useEffect(() => {
    async function bootWebContainer() {
      setOutput((previousOutput) => previousOutput + "\n\n Booting WebContainer...");
      containerRef.current = await WebContainer.boot();
      setOutput((previousOutput) => previousOutput + "\n\n WebContainer booted!");

      const process = await containerRef.current.spawn("node", ["-v"]);

      process.output.pipeTo(new WritableStream({
          write(chunk) {
              setOutput((previousOutput) => previousOutput + "\n\n Process output: " + chunk);
          }
      }));

      if (await process.exit) {
          setOutput((previousOutput) => previousOutput + "\n\n Process failed and exited with code: " + process.exit);
      } else {
          setOutput((previousOutput) => previousOutput + "\n\n Process succeeded and exited with code: " + process.exit);
      }
    }
    if (containerRef.current === null) bootWebContainer();

    return () => {
      if (containerRef.current) {
        containerRef.current = null;
      }
    }
  }, []);

  return (
    <div>
      <input
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
      />
      <button>
        Run
      </button>
      <div>
        {output}
      </div>
    </div>
  );
}

function App() {

  return (
    <>
      <CommandTerminal />
    </>
  )
}

export default App
