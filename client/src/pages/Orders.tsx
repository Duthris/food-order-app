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
import { carouselResponsiveOptions } from "../assets/carouselResponsiveOptions";
import Modal from '../components/Modal'
import AddCommentIcon from '@mui/icons-material/AddComment';
import { Rating } from '@mui/material';
import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import { addRating } from "../redux/actionCreators/addRating";

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
    const [isAddRatingModalOpen, setIsAddRatingModalOpen] = useState(false);
    const [rating, setRating] = useState<number | null>(0);
    const [review, setReview] = useState('');
    const [orderId, setOrderId] = useState<number | null>(null);
    
    const activeOrders = orders?.data?.filter((order: any) => order.status !== 'completed' && order.status !== 'rejected');
    const completedOrders = orders?.data?.filter((order: any) => order.status === 'completed');
    const cancelledOrders = orders?.data?.filter((order: any) => order.status === 'rejected');
    
    useEffect(() => {
        orders?.data?.forEach((order: any) => {
            setExpands((prev: any) => ({ ...prev, [order.id]: false }));
        })
    }, [orders?.data])

    const handleExpandClick = (id: any) => {
        setExpands((prev: any) => ({ ...prev, [id]: !prev[id] }));
    };

    const openAddRatingModal = (id: any) => { 
        setOrderId(id);
        setIsAddRatingModalOpen(true)
    }

    const closeAddRatingModal = () => { setIsAddRatingModalOpen(false) }

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

    const labels: { [index: string]: string } = {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
    };

    const [hover, setHover] = useState(-1);


    function getLabelText(value: number) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }

    const handleRatingSubmit = async (rating: number, review: string, orderId: number) => {
        console.log(rating);
        console.log(review);
        console.log(orderId);
        const data = {
            rating: rating,
            review: review,
            orderId: orderId
        }
        await dispatch(addRating(data));
        closeAddRatingModal();
        setRating(0);
        setReview('');
        setOrderId(null);
        window.location.reload();
    }

    const addRatingChildren = (orderId: number) => (
        <Fragment>
            <h1 style={{ color: 'red' }}>Add Rating</h1>
            <Divider />
            <TextField
                id="outlined-multiline-static"
                label="Review"
                multiline
                rows={4}
                defaultValue=""
                variant="outlined"
                color='secondary'
                style={{ width: '100%', marginTop: 10 }}
                onChange={(e) => setReview(e.target.value)}
            />
            <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                    setRating(newValue)
                }}
                getLabelText={getLabelText}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                style={{ marginTop: 10}}
            />
            {rating !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
            )}
            <Button
                variant="outlined"
                color="secondary"
                style={{ marginTop: 10 }}
                onClick={() => handleRatingSubmit(Number(rating), review, orderId)}
            >
                Send
            </Button>
        </Fragment>
    )


    useEffect(() => {
        dispatch(getUserOrders());
    }, [dispatch]);



    const collapseItemTemplateForMenusAndFoods = (item: any) => {
        return (
            <div className="p-col-12 p-md-6 p-lg-4">
                <Card sx={{ maxWidth: 345, height: 250, width: 200 }}>
                    <CardHeader
                        title={item.name}
                        subheader={item.price ? "$" + item.price : "$" + item.menuPrice }
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image={item.photo}
                        alt={item.name}
                        style={{ width: 150, height: 100, marginLeft: 15 }}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {item.description}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        )
    }


    const ordersTemplate = (order: any) => {
        const array = [...order?.Menus, ...order?.Foods];
        return (
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
                {order?.status === 'completed' && order?.Ratings?.length === 0 && 
                <Modal 
                        openModal={() => openAddRatingModal(order?.id)} 
                        closeModal={closeAddRatingModal} 
                        isOpen={isAddRatingModalOpen} 
                        children={addRatingChildren(orderId!)} 
                        openButtonText="Add Review"
                        startIcon={<AddCommentIcon />}
                    /> 
                }
                {order?.status === 'completed' && order?.Ratings?.length > 0 &&
                    <span style={{ marginTop: -15 }}>
                        <Typography style={{ color: 'green', fontWeight: 'bold' }} align='center'>
                            Rated 
                        </Typography>
                        <Rating name="read-only" value={order?.Ratings[0]?.rating} readOnly />
                        {expands[order?.id] && 
                        <>
                            <Divider />
                            <div className="flex">
                            <h1 style={{ marginTop: 15, color: '#A52A2A', fontWeight: 'bold' }}>Review</h1>
                            <Divider layout='vertical' />
                            <Typography className='break-all' style={{ marginTop: 15, color: '#808080', fontWeight: 'lighter' }} align='center'>
                                {order?.Ratings[0]?.review}
                            </Typography>
                            </div>
                            <Divider />
                        </>
                        }
                    </span>
                }
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
                <Carousel 
                    value={array} 
                    numVisible={1} 
                    numScroll={1} 
                    itemTemplate={collapseItemTemplateForMenusAndFoods}
                    style={{ height: 300, width: 300, marginLeft: 45 }}
                />
                </Collapse>
            </Card>
        </Fragment>
    )}

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
                                responsiveOptions={carouselResponsiveOptions}
                                itemTemplate={ordersTemplate}
                            />

                            <Divider />
                            <h1 style={{ fontWeight: 'bolder', color: 'green'}}>Completed Orders</h1>
                            <Divider />

                            <Carousel
                                value={completedOrders}
                                numVisible={4}
                                numScroll={2}
                                responsiveOptions={carouselResponsiveOptions}
                                itemTemplate={ordersTemplate}
                            />

                            <Divider />
                            <h1 style={{ fontWeight: 'bolder', color: 'red' }} >Cancelled Orders</h1>
                            <Divider />

                            <Carousel
                                value={cancelledOrders}
                                numVisible={4}
                                numScroll={2}
                                responsiveOptions={carouselResponsiveOptions}
                                itemTemplate={ordersTemplate}
                            />

                            <Divider />
                            </>
                    }
                </div>
            </div>
        </div>
    )};