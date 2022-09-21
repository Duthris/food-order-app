import { Dispatch } from '@reduxjs/toolkit';
import { ActionType, Action } from '../actionTypes';
import { toast } from 'react-toastify';
import { client } from '../../api/axios';

export const getCategoryRestaurants = (id: string) => {
    return async (dispatch: Dispatch<Action>) => {

        dispatch({
            type: ActionType.GET_CATEGORY_RESTAURANT_PENDING,
        });

        try {
            const request = client();
            const result = await request.get(`/api/user-management/restaurants/${id}`);

            dispatch({
                type: ActionType.GET_CATEGORY_RESTAURANT_SUCCESS,
                payload: result.data,
            });

            console.log(result.data)
        } catch (e: any) {
            dispatch({
                type: ActionType.GET_CATEGORY_RESTAURANT_FAIL,
                payload: e.message,
            });

            toast.error(e.response.data.message, {
                position: 'top-center',
                autoClose: 1500,
            });
        }
    };
}