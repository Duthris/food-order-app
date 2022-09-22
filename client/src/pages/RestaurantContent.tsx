import { Divider } from "primereact/divider";
import { Grid } from "@mui/material";
import Menu from "../components/Menu";
import Food from "../components/Food";
import { CircularProgress } from "@mui/material";
import { useRestaurantContent } from "../hooks/useRestaurantContent";
import { Fragment } from "react";

export default function RestaurantContent() {

    const data = useRestaurantContent();

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
                    {data?.loadingMenus && <CircularProgress sx={{ color: 'red' }}/>}
                    {data?.menus?.data?.map((menu: any) => {
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
                    {data?.loadingFoods && <CircularProgress sx={{ color: 'red' }}/>}
                    {data?.restaurantFoods?.data?.foods?.map((food: any) => {
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