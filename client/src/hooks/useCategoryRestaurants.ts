import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect } from "react";
import { getCategoryRestaurants } from "./../redux/actionCreators/getCategoryRestaurants";
import { useParams } from "react-router-dom";

export const useCategoryRestaurants = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();

    const { restaurants: categoryRestaurants, loading } = useAppSelector((state) => state.categoryRestaurants) as any;

    useEffect(() => {
        dispatch(getCategoryRestaurants(id!));
    }, [dispatch, id]);

    return { categoryRestaurants, loading };
}
