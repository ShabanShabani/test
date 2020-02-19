import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authService from '../../services/authService';

const ProtectedRoute = ({ path, role, component: Component, render, ...rest }) => {

    const user = authService.getCurrentUser();

    var userRole = [];
    if (role) userRole = role.split(',');
    return (
        <Route {...rest} render={props => {
            if (!user) {
                return (
                    <Redirect to='/auth' />
                )
            } else if (role && !userRole.includes(user.role)) {
                return (
                    <Redirect to='/' />
                )
            }
            return Component ? <Component {...props} {...rest} /> : render(props);
        }} />
    );
}

export default ProtectedRoute
