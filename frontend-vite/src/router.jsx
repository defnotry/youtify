import { Navigate, createBrowserRouter } from "react-router-dom";
import NotFound from "../src/views/NotFound";
import Landing from "../src/views/Landing";
import Login from "../src/views/Login";
import Register from "../src/views/Register";
import GuestLayout from "../src/components/layouts/GuestLayout";
import ListenerLayout from "../src/components/layouts/ListenerLayout";
import AdminLayout from "../src/components/layouts/AdminLayout";
import ListenerHome from "../src/views/listeners/ListenerHome";
import AdminDashboard from "../src/views/admins/AdminDashboard";
import Search from "./views/listeners/ListenerSearch";
import ListenerMusic from "./views/listeners/ListenerMusic";
import ListenerPodcast from "./views/listeners/ListenerPodcast";
import ListenerVideocast from "./views/listeners/ListenerVideocast";
import ArtistList from './views/admins/ArtistList';
import ListenerList from './views/admins/ListenerList';
import TotalMusicList from './views/admins/TotalMusicList';
import TotalPodcastList from './views/admins/TotalPodcastList';
import TotalVideocastList from './views/admins/TotalVideocastList';
import AdminSubscriptionPricing from './views/admins/AdminSubscriptionPricing';
import ArtistLayout from './components/layouts/ArtistLayout';
import AccessDenied from "./views/AccessDenied";
import ArtistProfile from './views/artists/ArtistProfile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/welcome" />,
      },

      {
        path: "/welcome",
        element: <Landing />,
      },

      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/register",
        element: <Register />,
      },
    ],
  },

  {
    path: "/",
    element: <ListenerLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/home" />,
      },

      {
        path: "/home",
        element: <ListenerHome />,
      },

      {
        path: "/search",
        element: <Search />
      },

      {
        path: "/music",
        element: <ListenerMusic />
      },

      {
        path: "/podcast",
        element: <ListenerPodcast />
      },

      {
        path: "/videocast",
        element: <ListenerVideocast />
      },
    ],
  },

  {
    path: "/",
    element: <ArtistLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/artist/profile" />
      },
      {
        path: "/artist/profile",
        element: <ArtistProfile />
      }
    ]
  },

  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/admin/dashboard" />,
      },
      {
        path: "/admin/dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/admin/artists",
        element: <ArtistList />
      },
      {
        path: "/admin/listeners",
        element: <ListenerList />
      },
      {
        path: "admin/music-list",
        element: <TotalMusicList />
      },
      {
        path: "admin/podcasts-list",
        element: <TotalPodcastList />
      },
      {
        path: "admin/videocasts-list",
        element: <TotalVideocastList />
      },
      {
        path: "admin/pricing-settings",
        element: <AdminSubscriptionPricing />
      }
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },

  {
    path: '/access-denied',
    element: <AccessDenied />
  }
]);

export default router;
