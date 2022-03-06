import { useSelector } from "react-redux";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  return <>{user ? <h1>Hello, {user.name}!</h1> : <h1>Hello stranger!</h1>}</>;
}

export default Dashboard;
