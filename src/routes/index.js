import { Navigate, useRoutes } from "react-router-dom";

import { INITIAL_PATH } from "../config-global";

import { EditorPage, EntriesPage } from "./elements";

export default function Router() {
    return useRoutes([
        {
            path: '/',
            // element: <EditorPage/>
            children: [
                { element: <Navigate to={INITIAL_PATH} replace />, index: true},
                { path: 'editor', element: <EditorPage/> },
                { path: 'entries', element: <EntriesPage/>},
            ]
        },
        // {
        //     path: 'entries',
        //     element: <EntriesPage/>
        // }

    ])
}