import React, { lazy, Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<CircularProgress />}>
      <Component {...props} />
    </Suspense>
  );


// ----------------------------------------------------------------------

// export const LoginPage = Loadable(lazy(() => import('../pages/LoginPage')));
export const EditorPage = Loadable(lazy(() => import('../pages/Editor')));
export const EntriesPage = Loadable(lazy(() => import('../pages/Entries')));
