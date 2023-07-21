// Import our custom CSS
import "../styles/main.scss";

// Import components
import "./components/index";

// Import javascript file as needed
import Home from "./pages/home";
import Add from "./pages/stories/add";

const routes = {
  "/": Home,
  "/stories/add.html": Add,
};

const detectRoute = () => routes[window.location.pathname];

const initPages = () => {
  const header = document.querySelector("header");
  const main = document.querySelector("main");
  const footer = document.querySelector("footer");

  if (header && main && footer) {
    main.style.minHeight = `calc(100vh - ${
      header.clientHeight + footer.clientHeight
    }px)`;
  }
};

window.addEventListener("DOMContentLoaded", async () => {
  initPages();

  const route = detectRoute();
  route.init();
});
