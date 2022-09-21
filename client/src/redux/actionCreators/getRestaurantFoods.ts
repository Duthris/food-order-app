import { Dispatch } from '@reduxjs/toolkit';
import { ActionType, Action } from '../actionTypes';
import { toast } from 'react-toastify';
import { client } from '../../api/axios';

export const getRestaurantFoods = (restaurantId: string) => {
    return async (dispatch: Dispatch<Action>) => {

        dispatch({
            type: ActionType.GET_RESTAURANT_FOODS_PENDING,
        });

        try {
            const request = client();
            const result = await request.get(`/api/food-management/restaurant-foods/${restaurantId}`);

            dispatch({
                type: ActionType.GET_RESTAURANT_FOODS_SUCCESS,
                payload: result.data,
            });

            console.log(result.data.data, 'foods')
        } catch (e: any) {
            dispatch({
                type: ActionType.GET_RESTAURANT_FOODS_FAIL,
                payload: e.message,
            });

            toast.error(e.response.data.message, {
                position: 'top-center',
                autoClose: 1500,
            });
        }
    };
}