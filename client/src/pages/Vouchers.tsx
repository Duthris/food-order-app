import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getVouchers } from "../redux/actionCreators/getVouchers";
import { Divider } from "primereact/divider";
import { useEffect, Fragment } from "react";
import { Card } from "primereact/card";
import { Stack } from "@mui/material";
import moment from 'moment';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Chip } from "primereact/chip";
import { Typography } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { Carousel } from "primereact/carousel";
import '../assets/carousel.css'

export default function Vouchers() {
    const dispatch = useAppDispatch();
    const { vouchers, loading } = useAppSelector((state) => state.vouchers) as any;
    console.log(vouchers)
    const activeVouchers = vouchers.data?.filter((voucher: any) => voucher.active === true);
    const inactiveVouchers = vouchers.data?.filter((voucher: any) => voucher.active === false);

    useEffect(() => {
        dispatch(getVouchers());
    }, [dispatch]);

    const copyToClipBoard = async (copyMe: any) => {
        try {
            await navigator.clipboard.writeText(copyMe);
            toast.success('Copied to clipboard', {
                position: "top-center",
                autoClose: 2000,
                closeOnClick: false,
            });
        } catch (err) {
            toast.error('Failed to copy', {
                position: "top-center",
                autoClose: 2000,
                closeOnClick: false,
            });
        }
    };
    

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



    const activeChip = (
        <Chip label="Active" className="ml-4 mt-4" style={{ backgroundColor: 'green', color: 'white' }} />
    );

    const inactiveChip = (
        <Chip label="Expired" className="ml-4 mt-4" style={{ backgroundColor: 'red', color: 'white' }} />
    );

    const activeVouchersTemplate = (voucher: any) => (
        <Fragment key={voucher.id}>                                  
            <Card 
            header={activeChip} 
            title={<Typography 
                        style={{ color: 'green', fontWeight: 'bolder', fontSize: '25px' }}
                    > 
                    {voucher.name} 
                    </Typography>}
            subTitle={voucher.description} 
            style={{ width: '100%', height: '100%' }}>
                <p>Discount: ${voucher.discount}</p>
                <p>Minimum Amount: ${voucher.minAmount}</p>
                {voucher.expiredAt && <p>Valid Until: {moment(voucher.expiredAt).format('DD/MM/YYYY')}</p>}
                <span>
                    <p className="bg-teal-400">Code: {voucher.code}</p>
                    <button
                        type="button"
                        onClick={() => copyToClipBoard(voucher.code)} 
                        className="text-gray-900 bg-gradient-to-r mt-5 from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        >Copy Code
                    </button>
                </span>
                
            </Card>
        </Fragment>
    )

    const inactiveVouchersTemplate = (voucher: any) => (
        <Fragment key={voucher.id}>                                  
            <Card 
            header={inactiveChip} 
            title={<Typography 
                    style={{ color: 'red', fontWeight: 'bolder', fontSize: '25px' }}
                    > 
                    {voucher.name} 
                    </Typography>
                    } 
            subTitle={voucher.description} 
            style={{ width: '100%', height: '100%' }}
            >
                <p>Discount: ${voucher.discount}</p>
                <p>Minimum Amount: ${voucher.minAmount}</p>
                <span>
                    <p className='bg-red-200'>Code: {voucher.code}</p>
                    <button 
                    type="button"
                    onClick={() => copyToClipBoard(voucher.code)} 
                    className="text-gray-900 bg-gradient-to-r mt-5 from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >Copy Code
                    </button>
                </span>
            </Card>
        </Fragment>
    )

    return (
        <div className="container mx-auto items-center h-screen mt-5">
            <div className="p-grid">
                <div className="p-col-12">
                    {loading && <CircularProgress sx={{ color: 'red' }}/>}
                    {vouchers.data?.length > 0 &&
                        <Stack spacing={2}>
                                {activeVouchers.length > 0 &&
                                    <>
                                        <h3 style={{ fontWeight: 'bolder' }} className='text-green-600'>Active Vouchers</h3>
                                        <Divider />
                                        <Carousel 
                                                value={activeVouchers}
                                                numVisible={3}
                                                numScroll={3}
                                                responsiveOptions={responsiveOptions}
                                                itemTemplate={voucher => activeVouchersTemplate(voucher)}
                                        />
                                    </>
                                }
                            <Divider />
                                {inactiveVouchers.length > 0 &&
                                    <>
                                        <h3 style={{ fontWeight: 'bolder' }} className="text-red-500">Past Vouchers</h3>
                                        <Divider />
                                        <Carousel
                                            value={inactiveVouchers}
                                            numVisible={3}
                                            numScroll={3}
                                            responsiveOptions={responsiveOptions}
                                            itemTemplate={voucher => inactiveVouchersTemplate(voucher)}
                                        />
                                    </>
                                }
                            <Divider />
                            <p style={{ marginBottom: 10, marginTop: -5 }}>You can use your vouchers at checkout. <Link style={{ color: 'red' }} to='/'>Order Now!</Link> </p>
                        </Stack>
                    }
                </div>
            </div>
        </div>
        );
}