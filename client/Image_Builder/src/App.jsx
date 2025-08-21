import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import FooterLast from "./components/FooterLast";

import Home from "./pages/Home";
import Login from "./pages/Login";
import BuyCredit from "./pages/BuyCredit";
import ImageGenerator from "./pages/ImageGenerator";
import BgRemover from "./pages/BgRemover";
import ImgUpscaler from "./pages/ImgUpscaler";
import ProtectedRoute from "./utils/ProtectedRoute";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/imagegenerator"
          element={
            <ProtectedRoute>
              <ImageGenerator />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bgremover"
          element={
            <ProtectedRoute>
              <BgRemover />
            </ProtectedRoute>
          }
        />

        <Route
          path="/imageupscaler"
          element={
            <ProtectedRoute>
              <ImgUpscaler />
            </ProtectedRoute>
          }
        />

        <Route path="/buycredit" element={<BuyCredit />} />
        <Route path="/login" element={<Login />} />

        {/* Catch-all route for unknown URLs */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <FooterLast />
    </>
  );
}

export default App;
