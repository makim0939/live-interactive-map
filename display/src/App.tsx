import useSocket from './hooks/useSocket';
function App() {
  const socket = useSocket();
  return (
    <>
      <h2 className=" text-red-600">Live Interactive Map - Display</h2>
    </>
  );
}

export default App;
