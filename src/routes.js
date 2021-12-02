import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import UserList from 'src/pages/UserList';
import VoituresList from 'src/pages/VoituresList';
import ReservationList from 'src/pages/ReservationList';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import Register from 'src/pages/Register';
import Settings from 'src/pages/Settings';
import AjouterVoiture from 'src/pages/AjouterVoiture';
import AjouterFacture from 'src/pages/AjouterFacture';
import AjouteAgence from 'src/pages/AjouterAgence';
import AjouterAdmin from 'src/pages/AjouterAdmin';
import FactureList from './pages/FactureList';
import LoginSuper from './pages/LoginSuper';
import AgenceList from './pages/AgenceList';
import AdminList from './pages/AdminList';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'users', element: <UserList /> },
      { path: 'voitures', element: <VoituresList /> },
      { path: 'ajoutervoiture', element: <AjouterVoiture /> },
      { path: 'ajouterfacture', element: <AjouterFacture /> },
      { path: 'ajouteagence', element: <AjouteAgence /> },
      { path: 'ajouteradmin', element: <AjouterAdmin /> },
      { path: 'reservation', element: <ReservationList /> },
      { path: 'facture', element: <FactureList /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'agences', element: <AgenceList /> },
      { path: 'admins', element: <AdminList /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      {path: 'loginsu', element: <LoginSuper /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element:  <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
