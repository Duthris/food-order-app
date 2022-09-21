import { Card, CardActionArea, CardMedia, CardHeader } from '@mui/material';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { Chip } from '@mui/material';

export default function Restaurant({ restaurant }: any) {
    const restaurantRating = restaurant?.Ratings.reduce((acc: any, rating: any) => acc + rating.rating, 0) / restaurant?.Ratings.length;
    return (
        <Card
            style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: '90%', marginRight: 15 }}
        >
            <Link to={`/restaurant/${restaurant.id}`}>
                <CardActionArea>
                    <CardHeader 
                        title={restaurant?.name}
                        subheader={
                            <Rating name="read-only" 
                                value={restaurantRating} 
                                max={5} 
                                defaultValue={0} 
                                precision={0.1}
                                readOnly 
                            />
                        }
                        action={
                            <Chip sx={{ color: 'white', background: 'red', marginLeft: 2 }} label={restaurantRating ? "⭐ " + restaurantRating + " / 5" : "⭐ 0 / 5"} />
                        }
                        sx={{color: 'red'}}
                    />
                    <CardMedia
                        component="img"
                        image={restaurant?.photo}
                        alt={restaurant?.name}
                        style={{ height: '200px' }}
                    />
                </CardActionArea>
            </Link>
        </Card>
    );
} 