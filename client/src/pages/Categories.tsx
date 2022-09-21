import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect } from "react";
import Category from "../components/Category";
import { getCategories } from './../redux/actionCreators/getCategories';
import { Grid } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { Carousel } from "primereact/carousel";

export default function Categories() {
    const dispatch = useAppDispatch();
    const { categories, loading } = useAppSelector((state) => state.categories) as any;
    console.log(categories, 'categories');

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

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
        <Grid container spacing={2} item style={{display: 'flex'}}>
            {loading && <CircularProgress sx={{ color: 'red' }}/>}
            <Carousel 
            value={categories?.data}
            numVisible={6}
            numScroll={2}
            responsiveOptions={responsiveOptions}
            itemTemplate={category => (
                <Category category={category} />
            )}
            />    
        </Grid>
    );
}