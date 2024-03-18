import { lazy } from 'react';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => <Component {...props} />;

// ----------------------------------------------------------------------

// export const LoginPage = Loadable(lazy(() => import('../pages/LoginPage')));
export const EditorPage = Loadable(lazy(() => import('../pages/Editor')));
export const EntriesPage = Loadable(lazy(() => import('../pages/Entries')));
