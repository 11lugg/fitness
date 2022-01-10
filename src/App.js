import Auth from "./components/auth";
import Dashboard from "./components/dashboard";
import PrivateOutlet from "./components/privateOutlet";
import { Route, Routes } from "react-router-dom";
import NotFound from "./components/notFount";



function App() {

  return (
    <main className="App">
      <Routes>
        <Route exact path="/" element={<Auth/>}/>
        <Route path="/dashboard" element={<PrivateOutlet/>}>
          <Route path="" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </main>
  );
}

export default App;
