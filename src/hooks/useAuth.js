import jwtDecode from "jwt-decode";

const useAuth = () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        return false;
    }
    
    try {
      const decodedToken = jwtDecode(token);
      
      // Check if the token has expired
      const currentDate = new Date();
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        localStorage.removeItem("token");
        return false;
      }

        return true;

    } catch (error) {
      // If there's an error decoding the token, it's likely invalid.
      localStorage.removeItem("token");
      return false;
    }
};

export default useAuth;