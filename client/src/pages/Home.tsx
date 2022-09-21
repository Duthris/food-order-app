import { Divider } from 'primereact/divider';
import Restaurants from './Restaurants';
import Categories from './Categories';
import { Grid } from '@mui/material';


export default function Home() {
    return (
        <div className="container mx-auto items-center h-screen">
            <div className="p-grid">
                <div className="p-col-12">
            <Divider />
                    <Grid container spacing={3} item style={{display: 'flex'}}>
                    <h1 style={{ color: 'red', fontWeight: "bold", marginTop: 20 }}>Categories</h1>
                    <Divider /> 
                    <Categories />
                    <Divider />
                </Grid>
                </div>
                <div className="p-col-12">
                    <Grid container spacing={2} item style={{display: 'flex'}}>
                    <h1 style={{ color: 'red', fontWeight: "bold", marginTop: 15 }}>Restaurants</h1>
                    <Divider />
                    <Restaurants />
                </Grid>
                </div>
            </div>
        </div>
    );
}