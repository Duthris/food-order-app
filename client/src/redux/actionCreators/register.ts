import { Dispatch } from '@reduxjs/toolkit';
import { ActionType, Action } from '../actionTypes';
import { toast } from 'react-toastify';
import { client } from '../../api/axios';

export const register = (data: any, registerType: string) => {
    return async (dispatch: Dispatch<Action>) => {

        dispatch({
            type: ActionType.REGISTER_PENDING,
        });

        try {
            const request = client();
            const result = await request.post(`/api/${registerType}-management/auth/register`, data);
            console.log(result.data.data, 'result.data');
            dispatch({
                type: ActionType.REGISTER_SUCCESS,
                payload: result.data,
            });

            localStorage.setItem('AUTH_TOKEN', result.data.data.token);
            console.log(result.data.data.token, 'result.data.token');

            toast.success('Successfully registered', {
                position: 'top-center',
                autoClose: 1000,
            });

        } catch (e: any) {
            dispatch({
                type: ActionType.REGISTER_FAIL,
                payload: e.message,
            });

            console.log(e);


            toast.error("Wrong register type is selected or " + (e.response.data.message).toLowerCase(), {
                position: 'top-center',
                autoClose: 1500,
            });
        }
    };
} 