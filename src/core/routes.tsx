import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import HomePage from "../pages/HomePage";
import MySentencesPage from "../pages/MySentencesPage";
import NotFoundPage from "../pages/NotFoundPage";

interface IRoute {
    layout: any,
    subRoutes: Array<any>
}

export default function Routes() {
    const routes: Array<IRoute> = [
        {
            layout: HomePage,
            subRoutes: [
                {
                    exact: true,
                    path: "/",
                    component: HomePage
                }
            ]
        },
        {
            layout: MySentencesPage,
            subRoutes: [
                {
                    exact: true,
                    path: "/my-sentences",
                    component: MySentencesPage
                }
            ]
        }
    ];

    return (
        <Router>
            <Switch>
                {routes.map((route, i) => (
                    <Route
                        key={i}
                        exact={route.subRoutes.some((r) => r.exact)}
                        path={route.subRoutes.map((r) => r.path)}
                    >
                        <route.layout>
                            {route.subRoutes.map((subRoute, i) => (
                                <Route key={i} {...subRoute} />
                            ))}
                        </route.layout>
                    </Route>
                ))}
                <Route component={NotFoundPage} />
            </Switch>
        </Router>
    );
}