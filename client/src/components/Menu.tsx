import { Card, CardActionArea, CardMedia, CardContent, CardHeader } from '@mui/material';
import { useAppDispatch } from "../hooks/hooks";
import { addMenuToBasket } from '../redux/actionCreators/addMenuToBasket';
import { getUserBasket } from '../redux/actionCreators/getUserBasket';

export default function Menu({menu}: any) {
    const dispatch = useAppDispatch();

    const addMenu = async (menuId: any) => {
        await dispatch(addMenuToBasket(menuId));
        await dispatch(getUserBasket());
        console.log(menuId, 'menu');
    }

    const menuId = {
        menuId: menu.id
    }


    return (
        <>
        <Card
            style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: '100%' }}
        >
                <CardActionArea>
                    <CardHeader
                        title={menu?.name}
                        subheader={menu?.description}
                        sx={{ color: 'red' }}
                    />
                    <CardMedia
                        component="img"
                        image={menu?.photo}
                        alt={menu?.name}
                        style={{ height: '200px' }}
                        onClick={() => addMenu(menuId)}
                    />
                    <CardContent>
                        <p>{"$" + menu?.menuPrice}</p>
                    </CardContent>
                </CardActionArea>
        </Card>
        </>
    );

}