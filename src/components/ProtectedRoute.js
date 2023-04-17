/*HOC ProtectedRoute — этим компонентом защитите роут "/,"
 чтобы на него не смогли перейти неавторизованные пользователи */
import React from 'react';
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...props }) => {
        return props.loggedIn ? (
            <Component {...props} />
        ) : (
            <Navigate to="/sign-in" replace />
        );
    };
export default ProtectedRoute;

