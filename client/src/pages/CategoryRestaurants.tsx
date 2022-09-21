import { getCategoryRestaurants } from "./../redux/actionCreators/getCategoryRestaurants";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useParams } from "react-router-dom";
import { Divider } from "primereact/divider";
import Restaurant from "../components/Restaurant";
import { Grid } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { Carousel } from "primereact/carousel";

export default function CategoryRestaurants() {
    const { id } = useParams<{ id: string }>();
    console.log(id, "id");
    const dispatch = useAppDispatch();
    const { restaurants, loading } = useAppSelector((state) => state.categoryRestaurants) as any;

    useEffect(() => {
        dispatch(getCategoryRestaurants(id!));
    }, [dispatch, id]);

    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    return (
        <div className="container mx-auto items-center h-screen">
            <div className="p-grid">
                <div className="p-col-12">
                    <Divider />
                </div>
                <div className="p-col-12">
                    <Grid container spacing={2} item style={{display: 'flex'}}>
                    <h1 style={{ color: 'red', fontWeight: 'bold' }}>Restaurants</h1>
                    <Divider /> 
                    {loading && <CircularProgress sx={{ color: 'red' }}/>}
                    {restaurants.data?.length > 0 &&
                        <Carousel 
                        value={restaurants?.data}
                        numVisible={5}
                        numScroll={2}
                        responsiveOptions={responsiveOptions}
                        itemTemplate={restaurant => (
                            <Restaurant restaurant={restaurant} />
                        )}
                    />    
                }
                </Grid>
                </div>
            </div>
        </div>
    );
}