import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect, Fragment } from "react";
import { Grid } from "@mui/material";
import { getUserBasket } from './../redux/actionCreators/getUserBasket';
import { Divider } from "primereact/divider";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup } from "@mui/material";
import PaymentIcon from '@mui/icons-material/Payment';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { resetBasket } from "../redux/actionCreators/resetBasket";
import { Card, CardHeader, CardMedia, CardContent } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from "@mui/material";
import { removeFoodFromBasket } from "../redux/actionCreators/removeFoodFromBasket";
import { removeMenuFromBasket } from "../redux/actionCreators/removeMenuFromBasket";
import { CircularProgress } from "@mui/material";

export default function Basket() {
    const dispatch = useAppDispatch();
    const { loading, basket } = useAppSelector((state) => state.basket) as any
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUserBasket());
    }, [dispatch]);

    const handleResetBasket = async () => {
        await dispatch(resetBasket());
        localStorage.removeItem('BASKET_FOODS');
        localStorage.removeItem('BASKET_MENUS');
        localStorage.removeItem('VOUCHER_CODE');
        localStorage.removeItem('isVoucherApplied');
        await dispatch(getUserBasket());
    }

    const handleRemoveFood = async (id: any) => {
        const food = {
            foodId: id
        }
        await dispatch(removeFoodFromBasket(food));
        await dispatch(getUserBasket());
    }

    const handleRemoveMenu = async (id: any) => {
        const menu = {
            menuId: id
        }
        await dispatch(removeMenuFromBasket(menu));
        await dispatch(getUserBasket());
    }

    return (
        <Grid item style={{display: 'flex'}}>
            {loading && <CircularProgress sx={{ color: 'red' }}/>}
            {basket.data &&
                (
                    <Grid item xs={6} sm={4} md={4} lg={2}>
                        {basket.data?.Foods?.length === 0 && basket.data?.Menus?.length === 0 && <> <p style={{ color: 'red', fontWeight: 'lighter' }}>Basket is empty</p> <Divider /> </>}
                        {basket.data?.Foods?.map((food: any) => {
                            return (
                                <Fragment key={food.id}>
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardHeader
                                        action={
                                            <IconButton aria-label="delete" onClick={() => handleRemoveFood(food.id)}>
                                                <ClearIcon style={{ color: 'red' }} />
                                            </IconButton>
                                        }
                                        title={food.name}
                                        sx={{ color: 'red' }}
                                        subheader={'$' + food.price}
                                        />
                                    <CardMedia
                                        component="img"
                                        src={food?.photo}
                                        alt={food?.name}
                                        sx={{ height: 80, width: 80, marginLeft: 2 }}
                                    />
                                    <CardContent>
                                        <p>{food.description}</p>
                                    </CardContent>
                                </Card>
                                <Divider />
                                </Fragment>
                            )
                        })}
                        {basket.data?.Menus?.map((menu: any) => {
                            return (
                                <Fragment key={menu?.id}>
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardHeader
                                        action={
                                            <IconButton aria-label="delete" onClick={() => handleRemoveMenu(menu.id)}>
                                                <ClearIcon style={{ color: 'red' }} />
                                            </IconButton>
                                        }
                                        title={menu?.name}
                                        sx={{ color: 'red' }}
                                        subheader={'$' + menu?.menuPrice}
                                        />
                                    <CardMedia
                                        component="img"
                                        src={menu?.photo}
                                        alt={menu?.name}
                                        sx={{ height: 80, width: 80, marginLeft: 2 }}
                                    />
                                    <CardContent>
                                        <p>{menu.description}</p>
                                    </CardContent>
                                </Card>
                                <Divider />
                                </Fragment>
                            )
                        })}
                        <p style={{ color: 'red', fontWeight: 'bold' }}>Total Amount {'\t\t\t\t$' + basket.data?.amount}</p>

                        <Divider />
                        <ButtonGroup color='secondary' variant="outlined" aria-label="small outlined button group">
                        <Button 
                        onClick={() => navigate('/checkout')}
                        startIcon={<PaymentIcon />}
                        disabled={basket?.data?.Foods?.length === 0 && basket?.data?.Menus?.length === 0}
                        >Checkout
                        </Button>
                        <Button
                        onClick={() => handleResetBasket()}
                        disabled={basket?.data?.Foods?.length === 0 && basket?.data?.Menus?.length === 0}
                        endIcon={<DeleteForeverIcon />}
                        >Reset Basket
                        </Button>
                        </ButtonGroup>
                        <Divider />
                    </Grid>
                )}
        </Grid>
            )};