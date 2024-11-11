import Sidebar from "../components/Sidebar";
import "../css/AdminDashboard.css";
function AdminDashboard() {
    return <>
        <main className="admin-nav">
            <Sidebar title={"Admin Dashboard"} />
        </main>
    </>
}

export default AdminDashboard;