export interface RouteMeta {
    hideHeader?: boolean;
    layout?: 'default' | 'minimal' | 'auth';
}

export interface RouteConfig {
    path: string;
    element: React.ReactNode;
    meta?: RouteMeta;
}