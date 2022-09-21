import { Dispatch } from '@reduxjs/toolkit';
import { ActionType, Action } from '../actionTypes';
import { toast } from 'react-toastify';
import { client } from '../../api/axios';

export const getUserOrders = () => {
    return async (dispatch: Dispatch<Action>) => {

        dispatch({
            type: ActionType.GET_USER_ORDERS_PENDING,
        });

        try {
            const token = localStorage.getItem('AUTH_TOKEN');

            if (!token) toast.error('You need to login!', {
                position: 'top-center',
                autoClose: 1500,
                });
                
            const request = client(token!);
            const result = await request.get(`/api/order-management/orders`);

            dispatch({
                type: ActionType.GET_USER_ORDERS_SUCCESS,
                payload: result.data,
            });

            console.log(result.data)
        } catch (e: any) {
            dispatch({
                type: ActionType.GET_USER_ORDERS_FAIL,
                payload: e.message,
            });

            toast.error(e.response.data.message, {
                position: 'top-center',
                autoClose: 1500,
            });
        }
    };
}