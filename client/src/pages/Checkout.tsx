import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { Divider } from "primereact/divider";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { getUserBasket } from "../redux/actionCreators/getUserBasket";
import { useEffect, Fragment, useState, useRef } from "react";
import { Box, Card, CardContent, CardHeader, 
    RadioGroup, Radio, FormControlLabel, FormControl, 
    FormLabel
} from "@mui/material";
import { getUserAddresses } from "../redux/actionCreators/getUserAddresses";
import LooksOneIcon from '@mui/icons-material/LooksOne';
import { CreditCard } from "@mui/icons-material";
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import { convertBasketToOrder } from "../redux/actionCreators/convertBasketToOrder";
import Modal from "../components/Modal";
import { OverlayPanel } from 'primereact/overlaypanel';
import usePlacesAutocomplete from "use-places-autocomplete";
import TextField from '@mui/material/TextField';
import { Combobox } from '@headlessui/react'
import { FormGroup } from '@mui/material';
import { Grid } from '@mui/material';
import { addAddress } from "../redux/actionCreators/addAddress";
import AddLocationIcon from '@mui/icons-material/AddLocation';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { applyVoucher } from "../redux/actionCreators/applyVoucher";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { getVouchers } from "../redux/actionCreators/getVouchers";
import { Typography, List } from '@mui/material';
import moment from 'moment';
import { CircularProgress } from '@mui/material';
import { removeVoucher } from "../redux/actionCreators/removeVoucher";
import { removeItemsFromStorage } from "../utils";

export default function Checkout() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const op = useRef<OverlayPanel>(null);
    const inputRef = useRef(null);
    const { basket } = useAppSelector((state) => state.basket) as any;
    const { addresses } = useAppSelector((state) => state.userAddresses) as any;
    const [isAddressesModalOpen, setIsAddressesModalOpen] = useState(false)
    const [isAddAddressesModalOpen, setIsAddAddressesModalOpen] = useState(false)
    const [isApplyVoucherModalOpen, setIsApplyVoucherModalOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0);
    const restAddresses = addresses?.data?.filter((address: any, index: number) => index !== activeIndex);
    const [code, setCode] = useState('');
    const [isSelected, setIsSelected] = useState(false);
    const [isVoucherApplied, setIsVoucherApplied] = useState(false);
    const { vouchers, loading: loadingVouchers } = useAppSelector((state) => state.vouchers) as any;
    const activeVouchers = vouchers.data?.filter((voucher: any) => voucher.active === true);

    const [addressName, setAddressName] = useState('');
    const [zip, setZip] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');

    const {
        //ready,
        value,
        suggestions: { status, data },
        setValue
    } = usePlacesAutocomplete();

    function closeAddressesModal() { setIsAddressesModalOpen(false) }
    function openAddressesModal() { setIsAddressesModalOpen(true) }
    function closeAddAddressesModal() { setIsAddAddressesModalOpen(false) }
    function openAddAddressesModal() { setIsAddAddressesModalOpen(true) }
    function openApplyVoucherModal() { setIsApplyVoucherModalOpen(true); dispatch(getVouchers()) }
    function closeApplyVoucherModal() { setIsApplyVoucherModalOpen(false) }

    const handleOverlayPanelToggle = (e: any) => {
        setValue(e.target.value);

        op.current?.show(e, inputRef.current);
    }

    const handleAddAddress = async () => {
        const address = {
            address: value,
            zip,
            city,
            country,
            state,
            name: addressName
        }

        if (address.address && address.zip && address.city && address.country && address.state && address.name) {
            await dispatch(addAddress(address));
            await dispatch(getUserAddresses());
            closeAddAddressesModal();
        }
    }

    const handleCheckout = async () => {
        const voucherCode = localStorage.getItem('VOUCHER_CODE') ? localStorage.getItem('VOUCHER_CODE') : null;
        const basketToOrder = {
            addressId: addressId,
            code: voucherCode
        }

        await dispatch(convertBasketToOrder(basketToOrder));
        await dispatch(getUserBasket());
        navigate('/orders');
    }

    const handleRemoveVoucher = async () => {
        await dispatch(removeVoucher());
        await dispatch(getUserBasket());
    }

    const handleApplyVoucher = async () => {
        try {
            const couponCode = {
                code
            }
            await dispatch(applyVoucher(couponCode));
            setIsVoucherApplied(true);
            dispatch(getUserBasket());
            closeApplyVoucherModal();
            localStorage.setItem('VOUCHER_CODE', code);
            localStorage.setItem('VOUCHER_NAME', activeVouchers?.find((voucher: any) => voucher.code === code)?.name)
            localStorage.setItem('isVoucherApplied', 'true');
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        value.length < 0 && op.current?.hide();
    }, [value])

    useEffect(() => {
        if (basket?.data?.Foods?.length === 0 && basket?.data?.Menus?.length === 0) {
            setCode('');
            setIsVoucherApplied(false);
            removeItemsFromStorage(['VOUCHER_CODE', 'VOUCHER_NAME', 'isVoucherApplied']);
        }   
    }, [basket?.data?.Foods?.length, basket?.data?.Menus?.length, basket])



    const applyVoucherChildren = (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Voucher Code"
                        name="code"
                        onChange={(e) => setCode(e.target.value)}
                        required
                        value={code}
                        variant="outlined"
                        color='secondary'
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                        color="secondary"
                        disabled={!code}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="outlined"
                        onClick={handleApplyVoucher}
                        sx={{ marginTop: '6px' }}
                    >
                        Apply
                    </Button>
                </Grid>
                <Divider /> 

            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend"><p style={{ color: 'red', fontWeight: 'bolder' }}>Vouchers</p></FormLabel>
                            <Divider />
                            {loadingVouchers && <CircularProgress style={{ color: 'red' }} />}
                            <RadioGroup
                                aria-label="vouchers"
                                name="vouchers"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            >
                                {activeVouchers?.map((voucher: any) => (
                                    <Fragment key={voucher.id}>
                                        <FormControlLabel sx={{ color: 'red' }} value={voucher.code} control={<Radio color='secondary' />} label={voucher.name} />
                                        <Card sx={{ border: '1px solid red', height: '15vh', width: '60vh'}}>
                                            <CardHeader
                                                title={<p style={{ color: 'red' }}>{voucher.code}</p>}
                                                subheader={
                                                <>
                                                <Typography variant="body2" color="text.secondary">
                                                    {voucher.description}
                                                </Typography>
                                                <Typography variant="body1" color="text.secondary">
                                                    Valid until {moment(voucher.expiredAt).format('MMM DD, YYYY')}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    ${voucher.minAmount} Min. order
                                                </Typography>
                                                </>
                                                }
                                                    action={<Typography variant='h6' color='green'>${voucher.discount}</Typography>}
                                                />
                                        </Card>
                                    </Fragment>
                                ))}
                            </RadioGroup>
                        </FormControl>
                </Grid>
            </Grid>
        </Fragment>
    )

    const addressesChildren = (
        <Fragment>
            <h1 style={{ color: 'red' }}>Saved Addresses</h1>
            <Divider />
            {restAddresses?.map((address: any) => (
                <Fragment key={address.id}>
                <Card sx={{ border: '1px solid red', height: '20vh', width: '60vh' }}>
                    <FormControlLabel key={address.id} value={address.id} control={<Radio sx={{ marginLeft: 2 }} color="secondary" />} label={address.name} 
                    onChange={(e) => {
                        setActiveIndex(addresses?.data?.indexOf(address))
                        closeAddressesModal()
                    }}
                    />
                    <CardHeader
                        subheader={address.address}
                    />
                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p>{`${address.state} / ${address.city} / ${address.country} / ${address.zip}`}</p>
                    </CardContent>
                </Card>
                <Divider />
                </Fragment>
            ))}
        </Fragment>
    )

    const addAddressChildren = (
        <Fragment>
            <h1 style={{ color: 'red' }}>Add Address</h1>
            <Divider />
            <TextField 
                label="Address Name"
                variant="outlined"
                color='secondary'
                value={addressName}
                onChange={(e) => setAddressName(e.target.value)}
                sx={{ width: '100%', marginBottom: 2 }}
            />
            <Divider />
            <TextField
                id="outlined-basic"
                label="Address"
                onFocus={()=>setIsSelected(false)}
                variant="outlined"
                color="secondary"
                sx={{ width: '100%' }}
                value={value}
                onChange={handleOverlayPanelToggle}
                ref={inputRef}
            />
            { !isSelected && value !== '' ?
            <OverlayPanel
                ref={op}
                id="overlay_panel"
                style={{ width: "625px" }}
                className="overlaypanel-demo"
                dismissable
            >
                <List>
                    {status === "OK" &&
                        data?.map(({ id, description }) => (
                            <Combobox key={description} onChange={() => {
                                setValue(description, false)
                                }}>
                            <Combobox.Option key={id} value={description}>
                                {({ active }) => (
                                    <div
                                        className={`option ${active ? "active" : ""}`}
                                    >
                                        <span style={{ cursor: 'pointer' }} onClick={() => {
                                console.log("deneme")
                                            
                                            setIsSelected(true)}}>{description}</span>
                                    </div>
                                )}
                            </Combobox.Option>
                            </Combobox>
                        ))}
                </List>
            </OverlayPanel> : null}
            <Divider />
            <FormGroup>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-basic"
                            label="State"
                            variant="outlined"
                            color="secondary"
                            sx={{ width: '100%' }}
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-basic"
                            label="City"
                            variant="outlined"
                            color="secondary"
                            sx={{ width: '100%' }}
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-basic"
                            label="Country"
                            variant="outlined"
                            color="secondary"
                            sx={{ width: '100%' }}
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-basic"
                            label="Zip"
                            variant="outlined"
                            color="secondary"
                            sx={{ width: '100%' }}
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </FormGroup>
            <Divider />
            <Button startIcon={<AddLocationIcon />} variant="outlined" color="secondary" onClick={handleAddAddress}>Add Address</Button>
        </Fragment>
    )
    
    
    const [addressId, setAddressId] = useState<string>('');
    
    useEffect(() => {
        if (addresses.data) {
            setAddressId(addresses.data[0].id);
        }    
    }, [addresses.data])
    
    useEffect(() => {
        dispatch(getUserBasket());
        dispatch(getUserAddresses());
    }, [dispatch]);


    console.log(data)

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh', marginTop: 10 }}>
                <Card>
                    <CardHeader
                        title="Delivery details"
                        style={{ color: 'red' }}
                        action={
                            <LooksOneIcon style={{ color: 'red' }} />
                        }
                    />
                    <CardContent>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Delivery address</FormLabel>
                                    <Divider />
                                    <RadioGroup
                                        aria-label="address"
                                        name="address"
                                        value={addressId}
                                        onChange={(e) => setAddressId(e.target.value)}
                                        defaultValue={addressId}
                                    >
                                        {addresses?.data && (
                                            <Fragment>
                                                <Card sx={{ border: '1px solid red', height: '20vh', width: '60vh'}}>
                                                <FormControlLabel key={addresses?.data[activeIndex]?.id} value={addresses?.data[activeIndex]?.id}
                                                control={<Radio sx={{ marginLeft: 2 }} color="secondary" />} label={addresses?.data[activeIndex]?.name} />
                                                <CardHeader
                                                    subheader={addresses?.data[activeIndex]?.address}
                                                />
                                                <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <p>{`${addresses?.data[activeIndex]?.state} / 
                                                        ${addresses?.data[activeIndex]?.city} / 
                                                        ${addresses?.data[activeIndex]?.country} / 
                                                        ${addresses?.data[activeIndex]?.zip}`}
                                                    </p>
                                                </CardContent>
                                            </Card>
                                            <Divider />
                                            <Modal 
                                                openModal={openAddressesModal} 
                                                closeModal={closeAddressesModal} 
                                                isOpen={isAddressesModalOpen} 
                                                children={addressesChildren} 
                                                openButtonText="View saved addresses"
                                                startIcon={<LocationOnIcon />}
                                            />

                                            </Fragment>
                                        )}

                                    </RadioGroup>
                                </FormControl>
                                <Modal 
                                    openModal={openAddAddressesModal} 
                                    closeModal={closeAddAddressesModal} 
                                    isOpen={isAddAddressesModalOpen} 
                                    children={addAddressChildren} 
                                    openButtonText="Add new address"
                                    startIcon={<AddLocationIcon />}
                                />
                                <Divider />
                    </CardContent>
                </Card>
                <Divider layout='vertical' />
                <Card>
                    <CardHeader
                        title="Payment"
                        style={{ color: 'red' }}
                        action={
                            <LooksTwoIcon style={{ color: 'red' }} />
                        }
                    />
                    <CardContent>
                        {localStorage.getItem('isVoucherApplied') !== 'true' && (
                            <Modal 
                                openModal={openApplyVoucherModal}
                                closeModal={closeApplyVoucherModal}
                                isOpen={isApplyVoucherModalOpen}
                                children={applyVoucherChildren}
                                openButtonText="Apply Voucher"
                                startIcon={<LocalOfferIcon />}
                            />    
                        )}
                        
                        {localStorage.getItem('isVoucherApplied') === 'true' && (
                            <Fragment>
                                <Typography>
                                <span>Voucher </span>
                                <span style={{ fontWeight: 'bold' }}>{localStorage.getItem("VOUCHER_NAME")}! </span>
                                <span style={{ fontWeight: 'bolder', color: 'red', cursor: 'pointer' }} onClick={handleRemoveVoucher}> Remove</span>
                                </Typography>
                            </Fragment>
                        )}
                        <Divider />
                    
                        {basket?.data && (
                            <Fragment>
                                {basket?.data?.Menus?.map((menu: any) => (
                                    <Fragment key={menu.id}>
                                        {/* <p>{menu.name}</p>
                                        <p>{menu.menuPrice}</p>
                                        <p>{menu.description}</p>
                                        <Divider /> */}
                                    </Fragment>
                                ))}
                            </Fragment>
                        )}
                        <Button 
                            startIcon={<CreditCard />} 
                            variant="outlined" 
                            color="secondary"
                            onClick={handleCheckout}
                            >Order Now
                        </Button>
                    </CardContent>
                </Card>
        </Box>
        );
}