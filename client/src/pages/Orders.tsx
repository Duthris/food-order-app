import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getUserOrders } from "../redux/actionCreators/getUserOrders";
import { Divider } from "primereact/divider";
import { useEffect, Fragment, useState } from "react";
import { Card, CardHeader, CardContent, CardMedia, Collapse, CardActions } from '@mui/material'
import moment from 'moment';
import { CircularProgress } from "@mui/material";
import { Carousel } from "primereact/carousel";
import { Chip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
const { expand, ...other } = props;
return <IconButton {...other} />;
})
    (({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Orders() {
    const dispatch = useAppDispatch();
    const { orders, loading } = useAppSelector((state) => state.orders) as any;

    const [expands, setExpands] = useState([]);

    useEffect(() => {
        orders?.data?.forEach((order: any) => {
            setExpands((prev: any) => ({ ...prev, [order.id]: false }));
        })
    }, [orders?.data])

    const handleExpandClick = (id: any) => {
        setExpands((prev: any) => ({ ...prev, [id]: !prev[id] }));
    };

    const activeOrders = orders?.data?.filter((order: any) => order.status !== 'completed' && order.status !== 'rejected');
    const completedOrders = orders?.data?.filter((order: any) => order.status === 'completed');
    const cancelledOrders = orders?.data?.filter((order: any) => order.status === 'rejected');

    const orderStatus = (status: any) => {
        switch(status) {
            case 'pending':
                return {status: 'Pending', color: 'grey' };
            case 'accepted':
                return {status: 'Accepted', color: 'darkolivegreen' };
            case 'rejected':
                return {status: 'Cancelled', color: 'red' };
            case 'completed':
                return {status: 'Completed', color: 'green' };
            case 'onTheWay':
                return {status: 'On the Way', color: 'burlywood' };
            case 'delivered':
                return {status: 'Arrived', color: 'aquamarine' };
            case 'preparing':
                return {status: 'Preparing', color: 'darkorange' };
            default:
                return {status: 'Pending', color: 'grey' };
        }
    }


    useEffect(() => {
        dispatch(getUserOrders());
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

    const ordersTemplate = (order: any) => (
        <Fragment key={order?.id}>
            <Card
            >
                <CardHeader
                    title={order?.Restaurant?.name}
                    subheader={moment(order?.createdAt).format('MMM Do YYYY, h:mm:ss a')}
                    action={
                    <Chip 
                        label={orderStatus(order?.status).status} 
                        style={{ backgroundColor: orderStatus(order?.status).color, color: '#fff', fontWeight: 'bold' }}
                    />
                }
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={order?.Restaurant?.photo}
                    alt={order?.Restaurant?.name}
                />
                <CardContent>
                <Typography style={{ fontWeight: 'bold', color: 'red' }} align="right">
                    Order Price
                </Typography>
                <Typography style={{ marginTop: 20, color: 'green' }} align="right">
                    ${order?.amount}
                </Typography>
                </CardContent>
                <CardActions disableSpacing>                
                    <ExpandMore
                        expand={expands[order?.id]}
                        onClick={() => handleExpandClick(order?.id)}
                        aria-expanded={expands[order?.id]}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon style={{ color: 'red' }} />
                    </ExpandMore>

                </CardActions>
                <Collapse in={expands[order?.id]} unmountOnExit>
                    <CardContent>
                        <Carousel value={order?.Menus && order?.Foods} numVisible={1} numScroll={1} responsiveOptions={responsiveOptions} circular={true} autoplayInterval={3000}>
                            {order?.Menus?.map((menu: any) => (
                                <div key={menu?.id}>
                                    <p>{menu?.name}</p>
                                    <img src={menu?.photo} alt={menu?.name} style={{ width: '100%', height: '100%' }} />
                                </div>
                            ))}
                            {order?.Foods?.map((food: any) => (
                                <div key={food?.id}>
                                    <p>{food?.name}</p>
                                    <img src={food?.photo} alt={food?.name} style={{ width: '100%', height: '100%' }} />
                                </div>
                            ))}
                        </Carousel>
                    </CardContent>
                </Collapse>
            </Card>
        </Fragment>
    )

    return (
        <div className="container mx-auto items-center h-screen mt-10">
            <div className="p-grid">
                <div className="p-col-12">
                    {loading && <CircularProgress sx={{ color: 'red' }}/>}
                    {orders?.data?.length > 0 &&
                    <>
                            <h1 style={{ fontWeight: 'bolder', color: 'burlywood'}}>Active Orders</h1>
                            <Divider />
                            <Carousel
                                value={activeOrders}
                                numVisible={4}
                                numScroll={2}
                                responsiveOptions={responsiveOptions}
                                itemTemplate={ordersTemplate}
                            />

                            <Divider />
                            <h1 style={{ fontWeight: 'bolder', color: 'green'}}>Completed Orders</h1>
                            <Divider />

                            <Carousel
                                value={completedOrders}
                                numVisible={4}
                                numScroll={2}
                                responsiveOptions={responsiveOptions}
                                itemTemplate={ordersTemplate}
                            />

                            <Divider />
                            <h1 style={{ fontWeight: 'bolder', color: 'red' }} >Cancelled Orders</h1>
                            <Divider />

                            <Carousel
                                value={cancelledOrders}
                                numVisible={4}
                                numScroll={2}
                                responsiveOptions={responsiveOptions}
                                itemTemplate={ordersTemplate}
                            />

                            <Divider />
                            </>
                    }
                </div>
            </div>
        </div>
    )};