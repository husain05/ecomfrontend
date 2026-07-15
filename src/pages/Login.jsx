import { Card, CardHeader, CardDescription, CardTitle, CardFooter, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ROLES } from "@/utils/constants"
import { useNavigate } from "react-router-dom"
import { loginAPI } from "@/services/authAPI"
import { useState } from "react"
import toast from "react-hot-toast"

function Login({ setUser }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await loginAPI(formData)
      console.log(response);
      toast.success(response.message)

      // save token to local storage 
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data));

      console.log("Stored Token:", localStorage.getItem("accessToken"));
      console.log("Stored User:", localStorage.getItem("user"));

      setUser(response.data);

      // fetch role from user data 

      const role = response.data.role
      // check whether user is admin or normal user
      if (role === ROLES.ADMIN) {
        navigate('/categories')
      }
      else {
        navigate('/products')
      }
      setFormData({
        email: "",
        password: ""
      })
    }

    catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message) || `Something went wrong`
    }

  }

  return (
    <div className="flex justify-center items-center m-auto min-h-[calc(100vh-64px)]">
      <Card className="w-full max-w-sm  ">
        <CardHeader>
          <CardTitle className='text-center '>Login to your account</CardTitle>
          <CardDescription className='text-center'>
            Enter your details below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitHandler} autoComplete="off">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="abc@example.com"
                  required
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  name="password"
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <CardFooter className="flex-col gap-2 px-0">
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </CardFooter>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>

  )
}
export default Login