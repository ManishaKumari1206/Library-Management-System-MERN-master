import React from 'react'; 

const AuthContext = React.createContext({ user: null }); 
const useAuthContext = () => React.useContext(AuthContext); 

const MockUser = {
    userFullName: "Manisha Kumari",
    employeeId: "Manisha123",
    email: "manishaadmin@library.com",
    mobileNumber: "8786767678",
    age: 24,
    gender: "Female",
    dob: "12/06/25",
    address: "456 Library Lane",
    userType: "Staff", 
    isAdmin: true 
};


function AdminProfile() {
    const { user: contextUser } = useAuthContext();
    const user = contextUser || MockUser; 

    if (!user) {
        // Keeping this as a simple Tailwind-styled fallback
        return <div className="p-4 text-lg font-medium text-gray-500 bg-white rounded-lg shadow-md">Loading Admin Profile...</div>;
    }

    const displayedRole = user.userType 
        ? user.userType 
        : (user.isAdmin 
            ? "Librarian/Admin" 
            : "Staff Member (Default)"); 

    return (
        // The main container class from your CSS:
        <div className="admin-profile">
            <h2 className="dashboard-title-line">Admin Profile</h2>
            
            {/* The grid wrapper class from your CSS: */}
            <div className="profile-details-grid">
                
                {/* 1. Full Name */}
                <div className="profile-detail-card">
                    <p className="detail-label">Full Name</p>
                    <p className="detail-value">{user.userFullName}</p>
                </div>
                
                {/* 2. Employee ID */}
                <div className="profile-detail-card">
                    <p className="detail-label">Employee ID</p>
                    <p className="detail-value">{user.employeeId}</p>
                </div>
                
                {/* 3. Email */}
                <div className="profile-detail-card">
                    <p className="detail-label">Email</p>
                    <p className="detail-value">{user.email}</p>
                </div>

                {/* 4. Mobile Number */}
                <div className="profile-detail-card">
                    <p className="detail-label">Mobile Number</p>
                    <p className="detail-value">{user.mobileNumber}</p>
                </div>
                
                {/* 5. Age */}
                <div className="profile-detail-card">
                    <p className="detail-label">Age</p>
                    <p className="detail-value">{user.age}</p>
                </div>
                
                {/* 6. Gender */}
                <div className="profile-detail-card">
                    <p className="detail-label">Gender</p>
                    <p className="detail-value">{user.gender}</p>
                </div>
                
                {/* 7. Date of Birth */}
                <div className="profile-detail-card">
                    <p className="detail-label">Date of Birth</p>
                    <p className="detail-value">{user.dob}</p>
                </div>
                
                {/* 8. Role (Highlighted using the new modifier class) */}
                <div className="profile-detail-card profile-detail-card-highlight">
                    <p className="detail-label">Role</p>
                    <p className="detail-value">{displayedRole}</p> 
                </div>

                {/* 9. Address (Spans both columns using the full-width class) */}
                <div className="profile-detail-card full-width">
                    <p className="detail-label">Address</p>
                    <p className="detail-value">{user.address}</p>
                </div>
            </div>
        </div>
    );
}

export default AdminProfile;

