import React from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { AuthLayout } from "../layout/AuthLayout";
import { AuthResponse, apiLogin } from "../../api";
import { useAuthStore } from "../../store";

type LoginFormFields = {
    email: string;
    password: string;
};

export const LoginPage = () => {
    const {
        handleSubmit,
        register,
        formState: { isValid, errors },
    } = useForm<LoginFormFields>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const setUser = useAuthStore((state) => state.setUser);

    const onSubmit = async (data: LoginFormFields) => {
        const { email, password } = data;

        apiLogin({ email, password }).then((response: AuthResponse) => {
            if (response.data && response.token) {
                setUser(response.data, response.token);
            }
        });
    };

    return (
        <AuthLayout title="Login">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6" action="#">
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Your email
                    </label>
                    <input
                        type="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                        {...register("email", { required: true })}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        {...register("password", { required: true, minLength: 6 })}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="remember"
                                aria-describedby="remember"
                                type="checkbox"
                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                                Remember me
                            </label>
                        </div>
                    </div>
                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                        Forgot password?
                    </a>
                </div>
                {JSON.stringify(errors.password?.message)}
                {errors.email && <p className="text-sm text-red-500 dark:text-red-400">Email is required</p>}
                {errors.password && <p className="text-sm text-red-500 dark:text-red-400">Password is required</p>}
                <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                    Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{" "}
                    <Link
                        to="/auth/register"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                        Sign up
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
};
