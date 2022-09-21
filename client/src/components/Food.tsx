import { Card, CardActionArea, CardMedia, CardContent, CardHeader } from '@mui/material';
import { useAppDispatch } from "../hooks/hooks";
import { addFoodToBasket } from '../redux/actionCreators/addFoodToBasket';
import { getUserBasket } from '../redux/actionCreators/getUserBasket';

export default function Food({food}: any) {
    const dispatch = useAppDispatch();

    const addFood = async (foodId: any) => {
        await dispatch(addFoodToBasket(foodId));
        await dispatch(getUserBasket());
        console.log(foodId, 'food');
    }

    const foodId = {
        foodId: food.id
    }

    return (
        <>
        <Card
            style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: '100%' }}
        >
                <CardActionArea>
                    <CardHeader
                        title={food?.name}
                        subheader={food?.description}
                        sx={{ color: 'red' }}
                    />
                    <CardMedia
                        component="img"
                        image={food?.photo}
                        alt={food?.name}
                        style={{ height: '200px' }}
                        onClick={() => addFood(foodId)}
                    />
                    <CardContent>
                        <p>{"$" + food?.price}</p>
                    </CardContent>
                </CardActionArea>
        </Card>
        </>
    );

}