function Logout({ onLogout }) {
    const handleLogout = () => {
        localStorage.removeItem("token");
        onLogout();
    };
    return (
        <button
            className="logout-btn"
            onClick={handleLogout}
        >
            Logout
        </button>
    );
}
export default Logout;