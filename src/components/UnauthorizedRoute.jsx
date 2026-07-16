function UnauthorizedRoute(){
    return(
         <div className="flex flex-col justify-center items-center min-h-screen">

        <h2 className="text-2xl font-semibold mt-4 text-white">
          Unauthorized Access
        </h2>

        <p className="text-gray-600 mt-2 text-white ">
          This is a protected route for admin only.
        </p>

         </div>
    )
}
export default UnauthorizedRoute