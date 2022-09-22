import Category from "../components/Category";
import { Grid } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { Carousel } from "primereact/carousel";
import { carouselResponsiveOptions } from "../assets/carouselResponsiveOptions";
import { useCategories } from "../hooks/useCategories";

export default function Categories() {
    const data = useCategories();

    return (
        <Grid container spacing={2} item style={{display: 'flex'}}>
            {data?.loading && <CircularProgress sx={{ color: 'red' }}/>}
            <Carousel 
            value={data?.categories?.data}
            numVisible={6}
            numScroll={2}
            responsiveOptions={carouselResponsiveOptions}
            itemTemplate={category => (
                <Category category={category} />
            )}
            />    
        </Grid>
    );
}