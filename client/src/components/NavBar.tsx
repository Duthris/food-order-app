import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import { Divider } from 'primereact/divider';
import { useNavigate } from 'react-router-dom';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Sidebar } from 'primereact/sidebar';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Basket from '../pages/Basket';


export default function NavBar() {
const [showSidebar, setShowSidebar] = React.useState<boolean>(false);   
const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

const navigate = useNavigate();

const pages = [
    { name: 'Home', href: '/' },
]

const options = [
    { name: 'Profile', href: '/' },
    { name: 'Orders', href: '/orders' },
    { name: 'Vouchers', href: '/vouchers' },
];

const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
setAnchorElNav(event.currentTarget);
};
const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
console.log(anchorElUser);
setAnchorElUser(event.currentTarget);
};

const handleCloseNavMenu = () => {
setAnchorElNav(null);
};

const handleCloseUserMenu = () => {
setAnchorElUser(null);
};

const handleLogout = async () => {
    localStorage.clear();
    navigate('/login');
    window.location.reload();
};

const user = localStorage.getItem('USER') || '';
const userObject = user && JSON.parse(user);

const arrow = anchorElUser ? <KeyboardArrowUpIcon style={{ color: 'red' }} /> : <KeyboardArrowDownIcon style={{ color: 'red' }} />;

return (
<AppBar position="sticky" style={{ backgroundColor: 'white' }}>
    <Toolbar>
        <Link to="/">
        <img
            src='https://i.hizliresim.com/fb76dal.png'
            height='60'
            width='60'
            alt='logo'
            loading='lazy'
            style={{ margin: '5px' }}
            />
        </Link>
        <Divider layout='vertical' />

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
        >
            <MenuIcon />
        </IconButton>
        <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
            display: { xs: 'block', md: 'none' },
            }}
        >
            {pages.map((page) => (
            <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                <Typography
                variant="body1"
                noWrap
                component="a"
                href={page.href}
                sx={{
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
                >
                {page.name}
                </Typography>
            </MenuItem>
            ))}
        </Menu>
        </Box>
        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
        <Typography
        variant="h5"
        noWrap
        component="a"
        href=""
        sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
        }}
        >
        LOGO
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {pages.map((page) => (
            <Button
            key={page.name}
            color="inherit"
            component={Link}
            to={page.href}
            sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'red',
                textDecoration: 'none',
            }}
            >
            {page.name}
            </Button>
        ))}
        </Box>

        {localStorage.getItem('AUTH_TOKEN') &&
        <Box sx={{ flexGrow: 0 }}>
        <Tooltip title={userObject?.name}>
            <Button onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar style={{ width: 30, height: 30 }} src={userObject?.photo.toString()} />
            <Typography
                variant="body1"
                noWrap
                component="a"
                sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'red',
                textDecoration: 'none',
                marginLeft: 2
                }}
            >
                {userObject?.name}
            </Typography>
            {arrow}
            </Button>
        </Tooltip>
        <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
        >
            {options.map((option) => (
            <Link key={option.name} to={option.href}>
                <MenuItem onClick={handleCloseUserMenu}>
                    <Typography style={{ color: 'red' }} textAlign="center">{option.name}</Typography>
                </MenuItem>
            </Link>
            ))}
            <Divider />
            <MenuItem onClick={handleLogout}>
            <Typography style={{ color: 'red' }} textAlign="center">Logout</Typography>
            </MenuItem>
        </Menu>
        </Box>
        }

        {!localStorage.getItem('AUTH_TOKEN') && (
        <>
        <Divider layout='vertical' />
        <Button
            color="inherit"
            component={Link}
            to="/login"
            sx={{
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'red',
            textDecoration: 'none',
            }}
        >
        <Avatar sx={{ bgcolor: 'red', marginRight: 1, width: 25, height: 25 }} />
            Login
        </Button>
        </>
        )}
        <Divider layout='vertical' />
        <IconButton onClick={() => setShowSidebar(prev=>!prev)} color="secondary">
            <ShoppingBasketIcon />
        </IconButton>
    </Toolbar>
    <Sidebar 
        visible={showSidebar} 
        modal={false} 
        dismissable={false} 
        position="right" 
        onHide={() => setShowSidebar(false)}
        style={{ marginTop: '130px' }}
    >
        <h3 style={{ color: 'red', fontWeight: 'bolder' }}>Basket</h3>
        <Divider />
        <div style={{ height: "120%"}}>
        <Basket />
        </div>
        <Divider />
    </Sidebar>
</AppBar>
);
};