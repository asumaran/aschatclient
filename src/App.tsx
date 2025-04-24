import { Button } from "@/components/ui/button";

function App() {
  function handleClick() {
    console.log("Hello World");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Button onClick={handleClick}>Hello World</Button>
    </div>
  );
}

export default App;
