import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router'

const Login = () => {
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})

    // if(!user.data.token){
    //     navigate("/")
    // }

    const initialization = {
        email: '',
        password: ''
    }

    const [value, setValue] = useState(initialization)

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setValue((prev) => ({
            ...prev,
            [name]: value
        }))
        console.log(e.target.value)
    }

    const validate = () => {
        let newErrors = {};

        if (!value.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(value.email)) {
            newErrors.email = "Enter a valid email address.";
        }

        if (!value.password.trim()) {
            newErrors.password = "password is required."
        } else if (value.password.length < 8) {
            newErrors.password = "password must be at least 8 characters."
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0;
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        console.log('Submitting data:', value)
        if (!validate()) {
            return
        }

        try {
            const response = await fetch("https://visarshop.aiodevstaging.com/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(value)
            })

            const responsedata = await response.json();
            if (responsedata.data) {
                toast.success('Login Successful')
                localStorage.setItem("user", JSON.stringify(responsedata));

                setValue(initialization)
                navigate('/home')
            } else {
                toast.error(responsedata?.message)
                console.log("Login failed", responsedata)
            }
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" value={value.email} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" onChange={handleChangeInput} />
                                {errors.email && <p className='text-white'>{errors.email}</p>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" value={value.password} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={handleChangeInput} />
                                {errors.password && <p className='text-white'>{errors.password}</p>}
                            </div>
                            <div className="flex items-center justify-between">
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline text-white">Forgot password?</a>
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 cursor-pointer">Sign in</button>
                            <div>
                                <p className="text-sm font-light text-white">
                                    Don’t have an account yet?
                                    <Link to={'register'} className="font-medium text-white hover:underline dark:text-primary-500 cursor-pointer">Sign up</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section >

    )
}

export default Login