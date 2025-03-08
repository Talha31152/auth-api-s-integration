import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router'

const Register = () => {
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})


    const initialization = {
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        password: '',
        confirm_password: '',
        address: ''
    }

    const [data, setData] = useState(initialization)

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setData((prev) => ({
            ...prev,
            [name]: value
        }))
        console.log(e.target.value)
    }

    const validate = () => {
        let newErrors = {};

        if (!data.first_name.trim()) {
            newErrors.first_name = "First name is required"
        }

        if (!data.last_name.trim()) {
            newErrors.last_name = "Last name is required"
        }

        if (!data.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            newErrors.email = "Enter a valid email address.";
        }

        if (!data.phone_number.trim()) {
            newErrors.phone_number = "Phone number is required.";
        } else if (!+/^\d{11}$/.test(data.phone_number)) {
            newErrors.phone_number = "Phone number must be 10 digits.";
        }

        if (!data.password.trim()) {
            newErrors.password = "password is required."
        } else if (data.password.length < 8) {
            newErrors.password = "password must be at least 8 characters."
        }

        if (!data.confirm_password.trim()) {
            newErrors.confirm_password = "confirm password is required."
        } else if (data.confirm_password !== data.password) {
            newErrors.confirm_password = "password do not match."
        }

        if (!data.address.trim()) {
            newErrors.address = "address is required."
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0;
    }



    const handleRegister = async (e) => {
        e.preventDefault()
        console.log('Submitting data:', data)
        if (!validate()) {
            return
        }
        try {
            const response = await fetch("https://visarshop.aiodevstaging.com/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })

            const responsedata = await response.json();
            if (responsedata.data) {
                toast.success("Registration Successfull")
                setData(initialization)
                navigate('/')

            } else {
                console.log("registration failed", responsedata)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-[550px] bg-white rounded-lg shadow dark:border md:mt-0  xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
                            <div className='flex justify-between items-center gap-4'>
                                <div className='flex-1'>
                                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name*</label>
                                    <input type="text" name="first_name" value={data.first_name} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the first name" required="" onChange={handleChangeInput} />
                                    {errors.first_name && <p className='text-white'>{errors.first_name}</p>}
                                </div>
                                <div className='flex-1'>
                                    <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                    <input type="text" name="last_name" value={data.last_name} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the last name" required="" onChange={handleChangeInput} />
                                    {errors.last_name && <p className='text-white'>{errors.last_name}</p>}
                                </div>
                            </div>
                            <div className='flex justify-between items-center gap-4'>
                                <div className='flex-1'>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" value={data.email} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" onChange={handleChangeInput} />
                                    {errors.email && <p className='text-white'>{errors.email}</p>}
                                </div>
                                <div className='flex-1'>
                                    <label htmlFor="phone_nmuber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                                    <input type="text" name="phone_number" value={data.phone_number} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the phone number" required="" onChange={handleChangeInput} />
                                    {errors.phone_number && <p className='text-white'>{errors.phone_number}</p>}
                                </div>
                            </div>
                            <div className='flex justify-between items-center gap-4'>
                                <div className='flex-1'>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" value={data.password} placeholder="Enter the password" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark: placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={handleChangeInput} />
                                    {errors.password && <p className='text-white'>{errors.password}</p>}
                                </div>
                                <div className='flex-1'>
                                    <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                    <input type="password" name="confirm_password" value={data.confirm_password} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the password" required="" onChange={handleChangeInput} />
                                    {errors.confirm_password && <p className='text-white'>{errors.confirm_password}</p>}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                <input type="text" name="address" value={data.address} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the address" required="" onChange={handleChangeInput} />
                                {errors.address && <p className='text-white'>{errors.address}</p>}
                            </div>
                            <div className="flex items-center justify-between">
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline text-white">Forgot password?</a>
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 cursor-pointer  ">Sign up</button>
                            <div>
                                <p className="text-sm font-light text-white">
                                    Already have an account?
                                    <Link to={'/'} className="font-medium text-white hover:underline dark:text-primary-500 cursor-pointer">Sign in</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register