import { getRestaurantMenus } from "../redux/actionCreators/getRestaurantMenus";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useParams } from "react-router-dom";
import { getRestaurantFoods } from "../redux/actionCreators/getRestaurantFoods";

export const useRestaurantContent = () => {
    const dispatch = useAppDispatch();
    const { menus, loading: loadingMenus } = useAppSelector((state) => state.menus) as any;
    const { restaurantFoods, loading: loadingFoods } = useAppSelector((state) => state.restaurantFoods) as any;
    const { restaurantId } = useParams<{ restaurantId: string }>(); 
    
    useEffect(() => {
        dispatch(getRestaurantMenus(restaurantId!));
        dispatch(getRestaurantFoods(restaurantId!));
    }, [dispatch, restaurantId]);

    return { menus, restaurantFoods, loadingMenus, loadingFoods };
}