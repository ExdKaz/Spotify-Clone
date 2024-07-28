import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [authGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('./main/main.component').then(m => m.MainComponent),
                canActivate: [authGuard],
                outlet: 'main'
            },
            {
                path: 'search',
                outlet: 'main',
                loadComponent: () => import('./search/search.component').then(m => m.SearchComponent),
                canActivate: [authGuard],
            }
        ]
    },
    { path: '**', redirectTo: 'login' } // Wildcard route for handling undefined paths
];
