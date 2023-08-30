import { BrowserRouter , Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Enter from "./pages/Enter";
import ResetPassword from "./pages/ResetPassword";
import NewStaff from "./pages/NewStaff";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/enter" element={<Enter />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/new" element={<NewStaff />} />
      </Routes>
    </div>
  );


}

export default App;
