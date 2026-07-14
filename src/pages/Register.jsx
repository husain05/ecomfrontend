import { Card, CardHeader, CardDescription, CardTitle, CardFooter, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registerAPI, sendOtpAPI } from "@/services/authAPI"
import { Navigate, useNavigate } from "react-router-dom"
import { useState } from "react"
import toast from "react-hot-toast"


function Register() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        phone: "",
        password: "",
        otp: "",
    });


    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const sendOtpHandler = async () => {
        if (!formData.email) {
            return toast.error('Please enter your email')
        }
        try {
            setLoading(true)
            const response = await sendOtpAPI(formData.email);
            console.log(response);
            toast.success(response.message)
        }
        catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message) || "Unable to send otp"
        }
        finally {
            setLoading(false)
        }
    }

    // register user

    const submitHandler = async(event) => {
        event.preventDefault()
        try {
            setLoading(true)
            const response = await registerAPI(formData)
            console.log(response)
            toast.success(response.message)
            navigate('/login')

            setFormData({
                firstName: "",
                lastName: "",
                userName: "",
                email: "",
                phone: "",
                password: "",
                otp: "",
            })
        }
        catch(error){
            console.log(error);
            toast.error(error?.response?.data?.message)||`Something went wrong while register`;

        }
        finally{
            setLoading(false)
        }
    }

    return (
        <div className="flex justify-center items-center m-auto min-h-[calc(100vh-64px)]">
            <Card className="w-full max-w-sm  ">
                <CardHeader>
                    <CardTitle className='text-center '>Create your account</CardTitle>
                    <CardDescription className='text-center'>
                        Fill your details to register
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submitHandler} autoComplete="off">
                        <div className="flex flex-col gap-6">


                            {/* firstName */}
                            <div className="grid gap-2">
                                <Label htmlFor="firstName">
                                    First Name
                                </Label>

                                <Input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Enter First Name"
                                    required
                                />
                            </div>

                            {/* lastName */}

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="lastName">Last Name</Label>
                                </div>
                                <Input
                                    name="lastName"
                                    id="lastName"
                                    type="text"
                                    required
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Enter Last Name"
                                    
                                />
                            </div>

                            {/* userName */}
                            <div className="grid gap-2">
                                <Label htmlFor="userName">
                                    Username
                                </Label>

                                <Input
                                    id="userName"
                                    name="userName"
                                    type="text"
                                    value={formData.userName}
                                    onChange={handleChange}
                                    placeholder="Enter Username"
                                    required
                                />
                            </div>

                            {/* email */}
                            <div className="grid gap-2">

                                <Label htmlFor="email">
                                    Email
                                </Label>

                                <div className="flex gap-2">

                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="abc@gmail.com"
                                        required
                                    />

                                    <Button
                                        type="button"
                                        onClick={sendOtpHandler}
                                        disabled={loading}
                                    >
                                        {loading ? "Sending..." : "Send OTP"}
                                    </Button>

                                </div>



                                {/* otp */}

                                <div className="grid gap-2">

                                    <Label htmlFor="otp">
                                        OTP
                                    </Label>

                                    <Input
                                        id="otp"
                                        name="otp"
                                        type="text"
                                        value={formData.otp}
                                        onChange={handleChange}
                                        placeholder="Enter OTP"
                                        required
                                    />

                                </div>

                            </div>

                            {/* Phone */}

                            <div className="grid gap-2">

                                <Label htmlFor="phone">
                                    Phone
                                </Label>

                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="9876543210"
                                    required
                                />

                            </div>


                            {/* Password */}

                            <div className="grid gap-2">

                                <Label htmlFor="password">
                                    Password
                                </Label>

                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="********"
                                    required
                                />


                                <CardFooter className="flex-col gap-2 px-0">
                                    <Button
                                        className="w-full"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? "Creating Account..." : "Register"}
                                    </Button>

                                </CardFooter>
                            </div>

                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )

}

export default Register