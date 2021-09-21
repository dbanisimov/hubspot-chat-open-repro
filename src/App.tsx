import { Routes } from "react-router";
import { BrowserRouter, Route } from "react-router-dom";
import ContactPage from "./ContactPage";
import { HubspotProvider } from "./HubspotContext";
import MainPage from "./MainPage";
import PageTracker from "./PageTracker";

function App() {
  return (
    <HubspotProvider>
      <BrowserRouter>
        <PageTracker />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
    </HubspotProvider>
  );
}

export default App;
