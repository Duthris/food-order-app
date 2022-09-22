import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getCategories } from './../redux/actionCreators/getCategories';

export const useCategories = () => {
    const dispatch = useAppDispatch();
    const { categories, loading } = useAppSelector((state) => state.categories) as any;

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    return { categories, loading };
}