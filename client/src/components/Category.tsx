import { Card, CardActionArea, CardMedia, Typography, CardContent } from '@mui/material';
import { Link, useParams } from 'react-router-dom';

export default function Category({category}: any) {
    const { id } = useParams<{ id: string }>();
    console.log(id, "id");
    return (
        <Card 
        style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: '95%', marginRight: 15 }}
        >
            <Link to={`/category/${category.id}`}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={category?.photo}
                    alt={category?.name}
                    style={{height: '200px'}}
                />
                <CardContent>
                    <Typography style={{ color: 'red' }} gutterBottom variant="h5" component="div">
                        {category?.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
            </Link>
        </Card>
    );

}