import { Divider } from "primereact/divider";
import { getRestaurantMenus } from "../redux/actionCreators/getRestaurantMenus";
import { useEffect, Fragment } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useParams } from "react-router-dom";
import { getRestaurantFoods } from "../redux/actionCreators/getRestaurantFoods";
import { Grid } from "@mui/material";
import Menu from "../components/Menu";
import Food from "../components/Food";
import { CircularProgress } from "@mui/material";

export default function RestaurantContent() {
    const dispatch = useAppDispatch();
    const { menus, loading } = useAppSelector((state) => state.menus) as any;
    const { restaurantFoods, loading: loadingFoods } = useAppSelector((state) => state.restaurantFoods) as any;
    const { restaurantId } = useParams<{ restaurantId: string }>(); 
    
    useEffect(() => {
        dispatch(getRestaurantMenus(restaurantId!));
        dispatch(getRestaurantFoods(restaurantId!));
    }, [dispatch, restaurantId]);

    useEffect(() => {
        console.log(menus);
        console.log(loading)
        console.log(restaurantId)
    }, [menus, loading, restaurantId]);

    return (
        <div className="container mx-auto items-center h-screen">
            <div className="p-grid">
                <div className="p-col-12">
                    <Divider />
                </div>
                <div className="p-col-12">
                    <Grid container spacing={2} item style={{display: 'flex'}}>
                    <h1 style={{ color: 'red', fontWeight: 'bold' }}>Menus</h1>
                    <Divider /> 
                    {loading && <CircularProgress sx={{ color: 'red' }}/>}
                    {menus.data?.map((menu: any) => {
                            return (
                                <Fragment key={menu.id}>
                                <Divider layout='vertical' />
                                <Grid item xs={6} sm={4} md={4} lg={2}>
                                    <Menu menu={menu} />
                                </Grid>
                                </Fragment>
                            );
                        },
                    )}
                    <Divider />
                    <h1 style={{ color: 'red', fontWeight: 'bold' }}>Foods</h1>
                    <Divider />
                    {loadingFoods && <CircularProgress sx={{ color: 'red' }}/>}
                    {restaurantFoods.data?.foods?.map((food: any) => {
                            return (
                                <Fragment key={food.id}>
                                <Divider layout='vertical' />
                                <Grid item xs={6} sm={4} md={4} lg={2}>
                                    <Food food={food} />
                                    </Grid>
                                </Fragment>
                            );
                        },
                    )}
                </Grid>
                </div>
            </div>
        </div>
    );
}