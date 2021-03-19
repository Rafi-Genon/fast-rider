import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router';
import { fullContext } from '../../App'
const PrivateRoute = ({ children, ...rest }) => {
    const[loggedInUser, setLoggedInUser ] = useContext(fullContext)
    return (
        <Route
            {...rest}
            render={({ location }) =>
            loggedInUser.email ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/log-in",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;