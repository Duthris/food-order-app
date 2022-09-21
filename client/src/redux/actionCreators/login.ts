import { Dispatch } from '@reduxjs/toolkit';
import { ActionType, Action } from '../actionTypes';
import { toast } from 'react-toastify';
import { client } from '../../api/axios';

export const login = (data: any, loginType: string) => {
    return async (dispatch: Dispatch<Action>) => {

        dispatch({
            type: ActionType.LOGIN_PENDING,
        });

        try {
            const request = client();
            const result = await request.post(`/api/${loginType}-management/auth/login`, data);
            console.log(result.data.data, 'result.data');
            dispatch({
                type: ActionType.LOGIN_SUCCESS,
                payload: result.data,
            });

            const user = {
                id: result.data.data.id,
                photo: result.data.data.photo,
                name: result.data.data.name,
            }

            localStorage.setItem('AUTH_TOKEN', result.data.data.token);
            localStorage.setItem('USER_PHOTO', result.data?.data?.photo);
            localStorage.setItem('USER_NAME', result.data?.data?.name);
            localStorage.setItem('USER', JSON.stringify(user));
            console.log(result.data.data.token, 'result.data.token');
            
            toast.success('Successfully logged in', {
                position: 'top-center',
                autoClose: 1000,
            });

        } catch (e: any) {
            dispatch({
                type: ActionType.LOGIN_FAIL,
                payload: e.message,
            });

            console.log(e);
            

            toast.error("Wrong login type is selected or " + (e.response.data.message).toLowerCase(), {
                position: 'top-center',
                autoClose: 1500,
            });
        }
    };
} 