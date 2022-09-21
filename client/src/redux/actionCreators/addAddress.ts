import { Dispatch } from '@reduxjs/toolkit';
import { ActionType, Action } from '../actionTypes';
import { toast } from 'react-toastify';
import { client } from '../../api/axios';

export const addAddress = (address: any) => {
    return async (dispatch: Dispatch<Action>) => {

        dispatch({
            type: ActionType.ADD_ADDRESS_PENDING,
        });

        try {
            const token = localStorage.getItem('AUTH_TOKEN');

            if (!token) toast.error('You need to login!', {
                position: 'top-center',
                autoClose: 1500,
                });

            const request = client(token!);
            const result = await request.post(`/api/user-management/add-address`, address);

            dispatch({
                type: ActionType.ADD_ADDRESS_SUCCESS,
                payload: result.data,
            });

            toast.success('Address added successfully!', {
                position: 'top-center',
                autoClose: 1500,
            });

            console.log(result.data);

        } catch (e: any) {
            dispatch({
                type: ActionType.ADD_ADDRESS_FAIL,
                payload: e.message,
            });

            toast.error(e.response.data.message, {
                position: 'top-center',
                autoClose: 1500,
            });
        }
    };
}