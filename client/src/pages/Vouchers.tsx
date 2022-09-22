import { Divider } from "primereact/divider";
import { Fragment } from "react";
import { Card } from "primereact/card";
import { Stack } from "@mui/material";
import moment from 'moment';
import { Link } from "react-router-dom";
import { Chip } from "primereact/chip";
import { Typography } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { Carousel } from "primereact/carousel";
import '../assets/carousel.css'
import { carouselResponsiveOptions } from "../assets/carouselResponsiveOptions";
import { useVouchers } from "../hooks/useVouchers";
import { copyToClipBoard } from "../utils";

export default function Vouchers() {    
    const vouchers = useVouchers();
    const activeVouchers = useVouchers(true);
    const inactiveVouchers = useVouchers(false);

    const statusChip = (active: boolean) => {
        return <Chip label={active ? 'Active' : 'Expired'} className="ml-4 mt-4" style={{ backgroundColor: active ? 'green' : 'red', color: 'white' }} />
    }
    
    const carouselTemplate = (active: boolean, vouchers: any) => {
        return (
            <>
            {vouchers.length > 0 &&
                <>
                    <h3 style={{ fontWeight: 'bolder' }} className={`${active ? 'text-green-600' : 'text-red-500'}`}>{active ? 'Active Vouchers' : 'Past Vouchers'}</h3>
                    <Divider />
                    {vouchers?.loading && <CircularProgress sx={{ color: 'red' }}/>}
                    <Carousel 
                            value={vouchers}
                            numVisible={3}
                            numScroll={3}
                            responsiveOptions={carouselResponsiveOptions}
                            itemTemplate={voucher => statusVouchersTemplate(active, voucher)}
                    />
                </>
            }
        <Divider />
        </>
        )
    }

    const statusVouchersTemplate = (active: boolean, voucher: any) => (
        <Fragment key={voucher.id}>                                  
            <Card 
            header={statusChip(active)} 
            title={<Typography 
                        style={{ color: active ? 'green' : 'red', fontWeight: 'bolder', fontSize: '25px' }}
                    > 
                    {voucher.name} 
                    </Typography>}
            subTitle={voucher.description} 
            style={{ width: '100%', height: '100%' }}>
                <p>Discount: ${voucher.discount}</p>
                <p>Minimum Amount: ${voucher.minAmount}</p>
                {voucher.expiredAt && active && <p>Valid Until: {moment(voucher.expiredAt).format('DD/MM/YYYY')}</p>}
                <span>
                    <p className={`${ active ? 'bg-teal-400' : 'bg-red-200'}`}>Code: {voucher.code}</p>
                    <button
                        type="button"
                        onClick={() => copyToClipBoard(voucher.code)} 
                        className={`${active ? 'text-gray-900 bg-gradient-to-r mt-5 from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' : 'text-gray-900 bg-gradient-to-r mt-5 from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'}`}
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
                    {vouchers?.loading && <CircularProgress sx={{ color: 'red' }}/>}
                    {vouchers?.filteredVouchers?.length > 0 &&
                        <Stack spacing={2}>
                                {carouselTemplate(true, activeVouchers?.filteredVouchers)}
                                {carouselTemplate(false, inactiveVouchers?.filteredVouchers)}
                            <p style={{ marginBottom: 10, marginTop: -5 }}>You can use your vouchers at checkout. <Link style={{ color: 'red' }} to='/'>Order Now!</Link> </p>
                        </Stack>
                    }
                </div>
            </div>
        </div>
        );
}