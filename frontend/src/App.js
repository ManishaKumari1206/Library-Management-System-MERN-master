import Home from './Pages/Home';
import Signin from './Pages/Signin'
import { BrowserRouter as Router, Switch, Redirect, Route } from "react-router-dom";
import MemberDashboard from './Pages/Dashboard/MemberDashboard/MemberDashboard.js';
import Allbooks from './Pages/Allbooks';
import Header from './Components/Header';
import AdminDashboard from './Pages/Dashboard/AdminDashboard/AdminDashboard.js';
import { useContext, useEffect } from "react"
import { AuthContext } from "./Context/AuthContext.js"

function App() {

  const { user } = useContext(AuthContext)

  // CRITICAL FIX: The previous logic allowed contradictory data (userType='Student' and isAdmin=true) to route to the Admin page.
  // The new logic prioritizes the explicit userType and ensures a user is ONLY considered Admin/Staff if their userType is NOT 'Student'.
  const isAdminOrStaff = user && (user.userType === 'Staff' || user.userType === 'Admin');

  // If you must include the isAdmin flag, use this more robust logic:
  // const isAdminOrStaff = user && (user.isAdmin === true && user.userType !== 'Student') || user.userType === 'Staff' || user.userType === 'Admin';
  // However, the first definition based purely on userType is cleaner if userType is reliable.

  // --- DEBUGGING CODE ADDED HERE ---
  useEffect(() => {
    if (user) {
      console.log("--- Auth State Debugging ---");
      console.log("User Object:", user);
      console.log("user.isAdmin:", user.isAdmin);
      console.log("user.userType:", user.userType);
      console.log("Calculated isAdminOrStaff:", isAdminOrStaff);
      console.log("----------------------------");
    } else {
      console.log("User is null/undefined. Showing Signin page.");
    }
  }, [user, isAdminOrStaff]);
  // ---------------------------------

  return (
    <Router>
      <Header />
      <div className="App">
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/signin'>
            {/* Redirect based on the combined role check */}
            {user 
              ? (isAdminOrStaff ? <Redirect to='/dashboard@admin' /> : <Redirect to='/dashboard@member' />) 
              : <Signin />}
          </Route>
          <Route exact path='/dashboard@member'>
            {/* Only allow non-admin/staff users (i.e., Students) to access the member dashboard */}
            {user 
              ? (!isAdminOrStaff ? <MemberDashboard /> : <Redirect to='/' />) 
              : <Redirect to='/' />}
          </Route>
          <Route exact path='/dashboard@admin'>
            {/* Only allow admin/staff users to access the admin dashboard */}
            {user 
              ? (isAdminOrStaff ? <AdminDashboard /> : <Redirect to='/dashboard@member' />) 
              : <Redirect to='/' />}
          </Route>
          <Route exact path='/books'>
            <Allbooks />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
