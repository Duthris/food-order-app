import { Dispatch } from '@reduxjs/toolkit';
import { ActionType, Action } from '../actionTypes';
import { toast } from 'react-toastify';
import { client } from '../../api/axios';

export const addMenuToBasket = (menuId: string) => {
    return async (dispatch: Dispatch<Action>) => {
            
            dispatch({
                type: ActionType.ADD_MENU_FOODS_TO_BASKET_PENDING,
            });
    
            try {
                const token = localStorage.getItem('AUTH_TOKEN');
    
                if (!token) toast.error('You need to login!', {
                    position: 'top-center',
                    autoClose: 1500,
                    });
    
                const request = client(token!);
                const result = await request.put(`/api/basket-management/basket/add-menu-to-basket`, menuId);

                console.log(result.data, 'addMenuFoodsToBasket')
    
                dispatch({
                    type: ActionType.ADD_MENU_FOODS_TO_BASKET_SUCCESS,
                    payload: result.data,
                });

                localStorage.setItem('BASKET_FOODS', JSON.stringify(result.data?.Foods));
    
                console.log(result.data)
            } catch (e: any) {
                dispatch({
                    type: ActionType.ADD_MENU_FOODS_TO_BASKET_FAIL,
                    payload: e.message,
                });
    
                toast.error(e.response.data.message, {
                    position: 'top-center',
                    autoClose: 1500,
                });
            }
    }
}