import { Dispatch } from '@reduxjs/toolkit';
import { ActionType, Action } from '../actionTypes';
import { toast } from 'react-toastify';
import { client } from '../../api/axios';

export const getVouchers = () => {
    return async (dispatch: Dispatch<Action>) => {

        dispatch({
            type: ActionType.GET_VOUCHERS_PENDING,
        });

        try {
            const token = localStorage.getItem('AUTH_TOKEN');

            if (!token) toast.error('You need to login!', {
                position: 'top-center',
                autoClose: 1500,
                });
                
            const request = client(token!);
            const result = await request.get(`/api/user-management/vouchers`);

            dispatch({
                type: ActionType.GET_VOUCHERS_SUCCESS,
                payload: result.data,
            });

            console.log(result.data)

        } catch (e: any) {
            dispatch({
                type: ActionType.GET_VOUCHERS_FAIL,
                payload: e.message,
            });

            toast.error(e.response.data.message, {
                position: 'top-center',
                autoClose: 1500,
            });
        }
    };
}