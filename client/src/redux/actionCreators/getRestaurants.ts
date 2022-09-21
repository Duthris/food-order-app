import { Dispatch } from '@reduxjs/toolkit';
import { ActionType, Action } from '../actionTypes';
import { toast } from 'react-toastify';
import { client } from '../../api/axios';

export const getRestaurants = () => {
    return async (dispatch: Dispatch<Action>) => {

        dispatch({
            type: ActionType.GET_RESTAURANTS_PENDING,
        });

        try {
            const request = client();
            const result = await request.get(`/api/user-management/restaurants`);

            dispatch({
                type: ActionType.GET_RESTAURANTS_SUCCESS,
                payload: result.data,
            });

            console.log(result.data)

        } catch (e: any) {
            dispatch({
                type: ActionType.GET_RESTAURANTS_FAIL,
                payload: e.message,
            });

            toast.error(e.response.data.message, {
                position: 'top-center',
                autoClose: 1500,
            });
        }
    };
}