import { Dispatch } from '@reduxjs/toolkit';
import { ActionType, Action } from '../actionTypes';
import { toast } from 'react-toastify';
import { client } from '../../api/axios';

export const removeMenuFromBasket = (menuId: any) => {
    return async (dispatch: Dispatch<Action>) => {

        dispatch({
            type: ActionType.REMOVE_MENU_FROM_BASKET_PENDING,
        });

        try {
            const token = localStorage.getItem('AUTH_TOKEN');

            if (!token) return;

            const request = client(token!);
            const result = await request.put(`/api/basket-management/basket/remove-menu-from-basket`, menuId);

            dispatch({
                type: ActionType.REMOVE_MENU_FROM_BASKET_SUCCESS,
                payload: result.data,
            });
        } catch (e: any) {
            dispatch({
                type: ActionType.REMOVE_MENU_FROM_BASKET_FAIL,
                payload: e.message,
            });

            toast.error(e.response.data.message, {
                position: 'top-center',
                autoClose: 1500,
            });
        }
    };
}