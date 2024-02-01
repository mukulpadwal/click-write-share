import "./App.css";

function App() {
  console.log(import.meta.env.VITE_REACT_PUBLIC_APP_APPWRITE_URL);
  return <div className="h-screen w-full bg-black text-white">{import.meta.env.VITE_REACT_PUBLIC_APP_APPWRITE_URL}</div>;
}

export default App;
