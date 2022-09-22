import { Divider } from "primereact/divider";
import Restaurant from "../components/Restaurant";
import { Grid } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { Carousel } from "primereact/carousel";
import { carouselResponsiveOptions } from "../assets/carouselResponsiveOptions";
import { useCategoryRestaurants } from "../hooks/useCategoryRestaurants";


export default function CategoryRestaurants() {
    const data = useCategoryRestaurants();
    
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
                    {data?.loading && <CircularProgress sx={{ color: 'red' }}/>}
                    {data?.categoryRestaurants?.data?.length > 0 &&
                        <Carousel 
                        value={data?.categoryRestaurants?.data}
                        numVisible={5}
                        numScroll={2}
                        responsiveOptions={carouselResponsiveOptions}
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