import { useState } from 'react';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Tabs, Tab } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PersonIcon from '@mui/icons-material/Person';
import { TextField } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';

export default function RegisterForm({ registerHandler }: any) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [registerType, setRegisterType] = useState("user");
    const [activeIndex, setActiveIndex] = useState(0);
    const { loading } = useAppSelector((state) => state.register) as any;

    const navigate = useNavigate();

    const registerInfo = {
        email,
        password,
        name,
        phone,
        address
    };

    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        registerHandler(e, registerInfo, registerType);
    }
        
    return (
        <div className="container mx-auto flex justify-center items-center h-screen">
            <div className="p-grid">
                <div className="p-col-12">
                    <h1 style={{ color: 'red', fontWeight: 'bolder' }}>Register</h1>
                    <Divider />
                    <Tabs textColor='secondary' indicatorColor='secondary' value={activeIndex} onChange={(e: any, newValue: number) => setActiveIndex(newValue)}>
                        <Tab icon={<PersonIcon />} label="User" onClick={() => setRegisterType("user")} />
                        <Tab icon={<StorefrontIcon />} label="Restaurant" onClick={() => setRegisterType("restaurant")} />
                    </Tabs>
                </div>
                    <Divider />
                    <form onSubmit={handleRegister}>
                        <TextField
                            style={{ marginRight: 10 }}
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email"
                            color='secondary'
                            required
                        />
                        <TextField
                            style={{ marginRight: 10 }}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                            color='secondary'
                            required
                        />
                        <TextField
                            style={{ marginRight: 10 }}
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            label="Phone"
                            color='secondary'
                            required
                        />
                        {registerType === "user" ? (
                            <>
                                <TextField
                                    style={{ marginRight: 10 }}
                                    type="text" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    label="Name"
                                    color='secondary'
                                    required
                                />
                            </>
                        ) : (
                            <>
                            <TextField
                                style={{ marginRight: 10 }}
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                label="Restaurant Name"
                                color='secondary'
                                required
                            />
                            <TextField 
                                style={{ marginRight: 10 }}
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                label="Restaurant Address"
                                color='secondary'
                                required
                            />
                            </>
                        )}
                        <Button 
                            className="p-button-danger" 
                            label="Register" 
                            type='submit' 
                            icon="pi pi-user-edit" 
                            disabled={(registerType === "user" && (email === "" || password === "" || name === "" || phone === "")) 
                                        || 
                                (registerType === "restaurant" && (email === "" || password === "" || name === "" || phone === "" || address === ""))}
                            loading={loading}
                        />
                    </form>
                </div>
                <div className='flex justify-center items-center'>
                    <Divider layout="vertical">
                    <b style={{ color: 'red' }}>OR</b>
                    </Divider>
                    <Button 
                        className="p-button-danger" 
                        label="Login" 
                        onClick={() => navigate("/login")} 
                        icon="pi pi-user-edit" 
                    />
                </div>
            </div>
    );
}