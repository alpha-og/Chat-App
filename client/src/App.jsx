// react imports
import { Route, Routes } from "react-router-dom";
// file imports
import { Home, SignIn, SignUp } from "./pages/pages";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/signUp" element={<SignUp />}></Route>
                <Route path="/signIn" element={<SignIn />}></Route>
            </Routes>
        </div>
    );
}

export default App;
