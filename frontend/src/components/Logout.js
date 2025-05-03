import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function Logout(){
    useEffect(() => {
        const logout = async () => {
            localStorage.removeItem("user"); // 🧹 pobriši lokalno stanje
            await fetch("http://localhost:3001/users/logout", { credentials: 'include' });
            window.location.reload(); // 🔁 osveži stanje brez ročnega refresh
        };
        logout();
    }, []);

    return <Navigate replace to="/" />;
}

export default Logout;
