// Import our custom CSS
import '../styles/main.scss';

// Import components
import './components/index';

// Import javascript file as needed
import Home from './pages/home';
import Add from './pages/stories/add';
import About from './pages/about';
import Login from './pages/auth/login';
import Register from './pages/auth/register';

const routes = {
  '/': Home,
  '/stories/add.html': Add,
  '/about.html': About,
  '/auth/login.html': Login,
  '/auth/register.html': Register,
};

const detectRoute = () => routes[window.location.pathname];

const initPages = () => {
  const header = document.querySelector('header');
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');

  if (header && main && footer) {
    main.style.minHeight = `calc(100vh - ${
      header.clientHeight + footer.clientHeight
    }px)`;
  }
};

window.addEventListener('DOMContentLoaded', async () => {
  initPages();

  const route = detectRoute();

  await route.init();
});
