
import { Button } from "@base-ui/react"
import { Link } from "react-router-dom"
function Home(){
    return(
       <div className="flex justify-center items-center min-h-screen ">
        <Link to='/products' className="bg-destructive text-white px-6 py-3 rounded-full flex flex-col ">
        
            Welcome to Ecommerce Shopping App

            <Button>
                <i>Signup and Signin to shop</i>
            </Button>
        
        </Link>

       </div>
    )
}
export default Home