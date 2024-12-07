import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import { loadApp } from './redux/actions/appActions'; 
import store from './redux/store';
import './App.css';
import Layout from './pages/Layout/Layout';
import Welcome from './components/DefPages/Welcome/Welcome';
import LogIn from './components/Auth/Login/Login';
import Registration from './components/Auth/Registration/Registration';
import Home from './components/DefPages/Home/Home';
import NotesPage from './pages/NotesPage/NotesPage';
import NoteDetail from './pages/NoteDetail/NoteDetail';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { AuthProvider } from './Context';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Welcome /> },
      { path: '/login', element: <LogIn /> },
      { path: '/registration', element: <Registration /> },
      {
        path: '/home',
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: '/notes',
        element: (
          <ProtectedRoute>
            <NotesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/notes/:id',
        element: (
          <ProtectedRoute>
            <NoteDetail />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const App = ({ loadApp }) => {
  useEffect(() => {
    loadApp();
  }, [loadApp]);

  return (
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  );
};


const mapDispatchToProps = {
  loadApp,
};

export default connect(null, mapDispatchToProps)(App);
