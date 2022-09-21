import React from "react";
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { login } from '../redux/actionCreators/login';
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { getUserBasket } from '../redux/actionCreators/getUserBasket';

export default function Login() {
    const dispatch = useAppDispatch();
    const result = useAppSelector((state) => state.login) as any;
    const navigate = useNavigate();

    const loginAdminHandler = async (event: React.FormEvent<HTMLFormElement>, loginInfo: any, loginType: string) => {
        event.preventDefault();
        await dispatch(login(loginInfo, loginType));
        await dispatch(getUserBasket());
        if (localStorage.getItem('AUTH_TOKEN')) {
        setTimeout(() => {
            navigate('/');
        }, 1000);
    }
        console.log(result);
    };

    return <LoginForm loginHandler={loginAdminHandler} />
}