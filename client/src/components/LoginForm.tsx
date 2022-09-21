import React, { useState } from "react";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { AccountCircle, Lock, Login } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { useAppSelector } from "../hooks/hooks";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PersonIcon from '@mui/icons-material/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export default function LoginForm({ loginHandler }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("admin");
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const { loading } = useAppSelector((state) => state.login) as any;

  const loginInfo = {
    email,
    password,
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    loginHandler(e, loginInfo, loginType);
    console.log(loginType);
    console.log(loading);
  };

  const emailRegex = new RegExp(
    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"
  );

  console.log(loginType)

  return (
    <>
      <div className="mx-auto flex justify-center items-center h-screen">
        <div className="p-grid">
          <div className="p-col-12">
            <h1 style={{ color: 'red', fontWeight: 'bolder' }}>Login</h1>
            <Divider />
            <Tabs textColor='secondary' indicatorColor='secondary' value={activeIndex} onChange={(e: any, newValue: number) => setActiveIndex(newValue)}>
              <Tab icon={<ManageAccountsIcon style={{ color: 'red' }} />} label="Admin" onClick={() => setLoginType("admin")} />
              <Tab icon={<PersonIcon style={{ color: 'red' }} />} label="User" onClick={() => setLoginType("user")} />
              <Tab icon={<StorefrontIcon style={{ color: 'red' }} />} label="Restaurant" onClick={() => setLoginType("restaurant")} />
            </Tabs>
          </div>
            <Divider />
            <form onSubmit={handleLogin}>
              <TextField
                style={{ marginRight: 10 }}
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                variant="outlined"
                error={!emailRegex.test(email) && email.length > 0}
                helperText={!emailRegex.test(email) && email.length > 0 ? "Please enter a valid email" : ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                        <AccountCircle style={{ color: "red" }} />
                    </InputAdornment>
                  ),
                }}
                color='secondary'
                required
              />

              <TextField
                style={{ marginRight: 10 }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                variant="outlined"
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                        <Lock style={{ color: 'red' }} />
                    </InputAdornment>
                  ),
                }}
                required
                color='secondary'
                error={password !== "" && password.length < 6}
                helperText={password.length < 6 && password !== "" ? "Password must be at least 6 characters" : ""}
              />
              <Button className="p-button-danger" loading={loading} disabled={!email || password.length < 6} icon={<Login style={{ marginRight: '10' }} />} type="submit" label="Login" />
              <Divider />
            </form>
        </div>
        <div className='flex justify-center items-center'>
        <Divider layout="vertical">
          <b style={{ color: 'red' }}>OR</b>
        </Divider>
        <Button className="p-button-danger" label="Register" onClick={() => navigate("/register")} icon="pi pi-user-edit" />
        </div>
      </div>

    </>
  );
}
