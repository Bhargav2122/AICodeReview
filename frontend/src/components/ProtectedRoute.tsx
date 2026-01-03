import type { ReactNode } from "react"
import { useAppSelector } from "../app/hooks"
import { Navigate } from "react-router-dom";

interface ProtectedRouteProp {
    children: ReactNode
}


 const ProtectedRoute = ({children}: ProtectedRouteProp) => {
   const  {user} = useAppSelector((s) => s.auth);
   if(!user) return <Navigate to='/signin' replace />;
   return <>{children}</>;
}

export default ProtectedRoute;