import { useContext } from "react";
import { Link } from "react-router-dom";
import HubspotContext from "./HubspotContext";

const ContactPage = () => {
  const { chatReady, openChat } = useContext(HubspotContext);
  return (
    <main>
      <h1>Contact us</h1>
      <div>
        <Link to="/">Back to main page</Link>
      </div>
      <div>
        <button onClick={openChat} disabled={!chatReady}>
          Open chat
        </button>
      </div>
    </main>
  );
};

export default ContactPage;
