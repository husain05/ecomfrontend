
import { Link } from "react-router-dom"
function Home(){
    return(
       <div className="flex justify-center items-center h-screen">
        <Link to='/products' className="bg-black text-white px-6 py-3 rounded">
        
        View Products
        
        </Link>

       </div>
    )
}
export default Home