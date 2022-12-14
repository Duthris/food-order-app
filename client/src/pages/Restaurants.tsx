import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getRestaurants } from "../redux/actionCreators/getRestaurants";
import { Divider } from "primereact/divider";
import { useEffect, Fragment } from "react";
import { Grid } from "@mui/material";
import Restaurant from "../components/Restaurant";
import { CircularProgress } from "@mui/material";
import { Carousel } from "primereact/carousel";
import '../assets/carousel.css'
import { carouselResponsiveOptions } from "../assets/carouselResponsiveOptions";

export default function Restaurants() {
    const dispatch = useAppDispatch();
    const { restaurants, loading } = useAppSelector((state) => state.restaurants) as any;

    useEffect(() => {
        dispatch(getRestaurants());
    }, [dispatch]);

    return (
        <>
        <div className="container mx-auto items-center h-screen">
            <div className="p-grid">
                <div className="p-col-12">
                    <Grid container spacing={2} item style={{display: 'flex'}}>
                    {loading && <CircularProgress sx={{ color: 'red' }}/>}
                    {restaurants.data?.length > 0 &&
                        <Carousel 
                        value={restaurants?.data}
                        numVisible={5}
                        numScroll={2}
                        responsiveOptions={carouselResponsiveOptions}
                        itemTemplate={restaurant => (
                            <Restaurant restaurant={restaurant} />
                        )}
                    />    
                    }
                <Divider />
                </Grid>
                </div>
            </div>
        </div>
        </>
    );
}