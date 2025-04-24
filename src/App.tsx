import { Button } from '@/components/ui/button';

function App() {
  function handleClick() {
    console.log('Hello World');
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button onClick={handleClick}>Hello World</Button>
    </div>
  );
}

export default App;
