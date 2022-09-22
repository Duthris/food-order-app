import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getUserBasket } from './../redux/actionCreators/getUserBasket';

export const useBasket = () => {
    const dispatch = useAppDispatch();
    const { basket, loading } = useAppSelector((state) => state.basket) as any;

    useEffect(() => {
        dispatch(getUserBasket());
    }, [dispatch]);

    return { basket, loading };
}