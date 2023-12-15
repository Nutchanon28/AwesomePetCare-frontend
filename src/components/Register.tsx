import React from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import "../css/Register.css";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useRegisterMutation } from "../features/auth/authApiSlice";

interface IUserInput {
    username: string;
    password: string;
}

const Register = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IUserInput>();
    const axiosPrivate = useAxiosPrivate();
    const [registerUser] = useRegisterMutation();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<IUserInput> = async (data) => {
        console.log(data);

        try {
            // const response = await axiosPrivate.post("/register", data);
            const response = await registerUser(data).unwrap();
            console.log(response);
            navigate("/login", { replace: true });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className="registerForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="registerFormContainer">
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    placeholder="username"
                    autoComplete="off"
                    type="text"
                    {...register("username", { required: true, maxLength: 10 })}
                />
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    placeholder="password"
                    type="password"
                    {...register("password", {
                        required: true,
                        pattern:
                            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/,
                    })}
                />
                <button type="submit">Sign Up</button>
            </div>
        </form>
    );
};

export default Register;
