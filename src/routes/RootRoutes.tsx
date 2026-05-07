import { Routes, Route } from 'react-router-dom';
import { PublicLayout } from '@/components/publicLayout';
import { RouteConfig } from '@/types/routes';
import { fallbackRoute, publicRoutes } from './AllRoutesList';

const renderRoutes = (routes: RouteConfig[]) =>
    routes.map(({ path, element }) => <Route key={path} path={path} element={element} />);

const RootRoutes = () => (
    <Routes>
        <Route element={<PublicLayout />}>
            {renderRoutes(publicRoutes)}
        </Route>

        <Route path={fallbackRoute.path} element={fallbackRoute.element} />
    </Routes>
);

export default RootRoutes;
