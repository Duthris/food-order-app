import { useAppDispatch, useAppSelector } from "./hooks";
import { useState, useEffect } from "react";
import { getVouchers } from  '../redux/actionCreators/getVouchers';

export const useVouchers = (status?: any) => {
    const dispatch = useAppDispatch();
    const { vouchers, loading } = useAppSelector((state) => state.vouchers) as any;
    const [filteredVouchers, setFilteredVouchers] = useState([]);

    useEffect(() => {
        dispatch(getVouchers());
    }, [dispatch]);

    useEffect(() => {
        if (status === true || status === false) {
            setFilteredVouchers(vouchers?.data?.filter((voucher: any) => voucher.active === status));
        } else {
            setFilteredVouchers(vouchers?.data);
        }
    }, [vouchers, status]);

    return { filteredVouchers, loading };
}