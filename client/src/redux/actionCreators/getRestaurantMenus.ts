import { Dispatch } from '@reduxjs/toolkit';
import { ActionType, Action } from '../actionTypes';
import { toast } from 'react-toastify';
import { client } from '../../api/axios';

export const getRestaurantMenus = (restaurantId: string) => {
    return async (dispatch: Dispatch<Action>) => {

        dispatch({
            type: ActionType.GET_RESTAURANT_MENUS_PENDING,
        });

        try {
            const request = client();
            const result = await request.get(`/api/menu-management/restaurant-menus/${restaurantId}`);

            dispatch({
                type: ActionType.GET_RESTAURANT_MENUS_SUCCESS,
                payload: result.data,
            });

            console.log(result.data.data, 'menu')
        } catch (e: any) {
            dispatch({
                type: ActionType.GET_RESTAURANT_MENUS_FAIL,
                payload: e.message,
            });

            toast.error(e.response.data.message, {
                position: 'top-center',
                autoClose: 1500,
            });
        }
    };
}