import React from 'react';
// Icons
import DashboardIcon from '@material-ui/icons/Dashboard';
import InfoIcon from '@material-ui/icons/Info';
import Star from '@material-ui/icons/Star';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import { Home, About, Projects, Portfolio, Contact } from 'pages';

export const routes = [
    {
        primaryText: 'Home',
        component: <Home />,
        path: '/',
        exact: true,
        icon: <DashboardIcon />,
    },
    {
        primaryText: 'About',
        component: <About />,
        path: '/about',
        exact: true,
        icon: <InfoIcon />,
    },
    {
        primaryText: 'Projects',
        component: <Projects />,
        path: '/projects',
        exact: true,
        icon: <Star />,
    },
    {
        primaryText: 'Portfolio',
        component: <Portfolio />,
        path: '/portfolio',
        exact: true,
        icon: <DonutLargeIcon />,
    },
    {
        primaryText: 'Get In Touch',
        component: <Contact />,
        path: '/contact',
        exact: true,
        icon: <QuestionAnswerIcon />,
    },
];
