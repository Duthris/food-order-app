import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { register } from "../redux/actionCreators/register";
import RegisterForm from "../components/RegisterForm";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const dispatch = useAppDispatch();
    const result = useAppSelector((state) => state.register) as any;
    const navigate = useNavigate();

    const registerHandler = async (event: React.FormEvent<HTMLFormElement>, registerInfo: any, registerType: string) => {
        event.preventDefault();
        await dispatch(register(registerInfo, registerType));

        if (localStorage.getItem("AUTH_TOKEN")) {
            setTimeout(() => {
                navigate("/");
            }, 1000);
        }

        console.log(result);
    };

    return <RegisterForm registerHandler={registerHandler} />
}