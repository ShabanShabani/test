import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import auth from '../../services/authService'

const ProtectedRoute = ({ access, path, component: Component, render, ...rest }) => {
    const user = auth.getCurrentUser();
    return (
        <Route {...rest} render={props => {
            if (!user) {
                return (
                    <Redirect to='/auth' />
                )
            }
            else if(access)
            {
                return Component ? <Component {...props} {...rest} /> : render(props);
            }
            return (
                <Redirect to='/' />
            )
        }}/>
    );
}

export default ProtectedRoute;
