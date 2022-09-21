import { Dispatch } from '@reduxjs/toolkit';
import { ActionType, Action } from '../actionTypes';
import { toast } from 'react-toastify';
import { client } from '../../api/axios';

export const applyVoucher = (code: any) => {
    return async (dispatch: Dispatch<Action>) => {
            
            dispatch({
                type: ActionType.APPLY_VOUCHER_PENDING,
            });
    
            try {
                const token = localStorage.getItem('AUTH_TOKEN');

                if (!token) toast.error('You need to login!', {
                    position: 'top-center',
                    autoClose: 1500,
                    });

                const request = client(token!);
                console.log(code, 'code from applyVoucher.ts')
                const result = await request.put(`/api/basket-management/basket/apply-voucher`, code);

                console.log(result.data, 'applyVoucher')

                dispatch({
                    type: ActionType.APPLY_VOUCHER_SUCCESS,
                    payload: result.data,
                });

                localStorage.setItem('BASKET_FOODS', JSON.stringify(result.data?.Foods));

                console.log(result.data)
            } catch (e: any) {
                dispatch({
                    type: ActionType.APPLY_VOUCHER_FAIL,
                    payload: e.message,
                });

                toast.error(e.response.data.message, {
                    position: 'top-center',
                    autoClose: 1500,
                });
            }
    }
}