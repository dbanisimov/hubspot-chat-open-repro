import { Link } from "react-router-dom";

const MainPage = () => (
  <main>
    <h1>Main page</h1>
    <div>
      <Link to="/contact">Contact page</Link>
    </div>
  </main>
);

export default MainPage;
