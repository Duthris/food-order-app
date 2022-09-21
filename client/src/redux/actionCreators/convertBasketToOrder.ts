import { Dispatch } from '@reduxjs/toolkit';
import { ActionType, Action } from '../actionTypes';
import { toast } from 'react-toastify';
import { client } from '../../api/axios';

export const convertBasketToOrder = (addressId: any) => {
    return async (dispatch: Dispatch<Action>) => {
            
            dispatch({
                type: ActionType.CONVERT_BASKET_TO_ORDER_PENDING,
            });
    
            try {
                const token = localStorage.getItem('AUTH_TOKEN');
    
                if (!token) toast.error('You need to login!', {
                    position: 'top-center',
                    autoClose: 1500,
                    });
    
                const request = client(token!);
                const result = await request.post(`/api/order-management/orders/convert-basket-to-order`, addressId);
    
                dispatch({
                    type: ActionType.CONVERT_BASKET_TO_ORDER_SUCCESS,
                    payload: result.data,
                });

                console.log(result.data);

                toast.success('Order created successfully!', {
                    position: 'top-center',
                    autoClose: 1500,
                });

                localStorage.removeItem('VOUCHER_CODE');
                localStorage.removeItem('VOUCHER_NAME');
                localStorage.removeItem('isVoucherApplied');

            } catch (e: any) {
                dispatch({
                    type: ActionType.CONVERT_BASKET_TO_ORDER_FAIL,
                    payload: e.message,
                });
    
                toast.error(e.response.data.message, {
                    position: 'top-center',
                    autoClose: 1500,
                });
            }
    }
}