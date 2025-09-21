import { Routes } from '@angular/router';
import path from 'node:path';
import { LandingPage } from './landing-page/landing-page';

export const routes: Routes = [
    {path: '', component: LandingPage}
];
