import { Dispatch } from '@reduxjs/toolkit';
import { ActionType, Action } from '../actionTypes';
import { toast } from 'react-toastify';
import { client } from '../../api/axios';

export const removeVoucher = () => {
    return async (dispatch: Dispatch<Action>) => {
            
            dispatch({
                type: ActionType.REMOVE_VOUCHER_PENDING,
            });
    
            try {
                const token = localStorage.getItem('AUTH_TOKEN');

                if (!token) toast.error('You need to login!', {
                    position: 'top-center',
                    autoClose: 1500,
                    });

                const request = client(token!);
                const result = await request.put(`/api/basket-management/basket/remove-voucher`);

                console.log(result.data, 'removeVoucher')

                dispatch({
                    type: ActionType.REMOVE_VOUCHER_SUCCESS,
                    payload: result.data,
                });

                localStorage.removeItem('isVoucherApplied');
                localStorage.removeItem('VOUCHER_NAME');
                localStorage.removeItem('VOUCHER_CODE');

                console.log(result.data)
            } catch (e: any) {
                dispatch({
                    type: ActionType.REMOVE_VOUCHER_FAIL,
                    payload: e.message,
                });

                toast.error(e.response.data.message, {
                    position: 'top-center',
                    autoClose: 1500,
                });
            }
    }
}