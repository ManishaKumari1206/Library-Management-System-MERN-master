import React, { useContext, useEffect, useState } from 'react'
import "../AdminDashboard.css"
import axios from "axios"
import { AuthContext } from '../../../../Context/AuthContext'
import { Dropdown } from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment"

function AddTransaction() {

    const API_URL = process.env.REACT_APP_API_URL
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useContext(AuthContext)

    // New states for the custom popup
    
    const [borrowerId, setBorrowerId] = useState("")
    const [borrowerDetails, setBorrowerDetails] = useState([])
    const [bookId, setBookId] = useState("")
    const [bookDetails, setBookDetails] = useState({}) // Added to store book details
    const [recentTransactions, setRecentTransactions] = useState([])
    const [allMembers, setAllMembers] = useState([])
    const [allBooks, setAllBooks] = useState([])

    const [fromDate, setFromDate] = useState(null)
    const [fromDateString, setFromDateString] = useState(null)

    const [toDate, setToDate] = useState(null)
    const [toDateString, setToDateString] = useState(null)

    const transactionTypes = [
        { value: 'Reserved', text: 'Reserve' },
        { value: 'Issued', text: 'Issue' }
    ]

    const [transactionType, setTransactionType] = useState("")

    /* Fetching book details (When a book is selected) */
    // Helper function moved to the useEffect below, but kept here for function call in addTransaction
    const getbookDetails = async (id) => {
        try {
            const response = await axios.get(API_URL + "api/books/getbook/" + id)
            setBookDetails(response.data)
        }
        catch (err) {
            console.log("Error in getting book details")
            setBookDetails({}); // Clear on error
        }
    }

    /* Adding a Transaction */
    const addTransaction = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        
        // Use bookDetails state, which is fetched in the useEffect below
        const book_details = bookDetails; 

        if (bookId !== "" && borrowerId !== "" && transactionType !== "" && fromDate !== null && toDate !== null) {
            
            // Fetching user details for borrowerName
            const borrower_details_res = await axios.get(API_URL + "api/users/getuser/" + borrowerId)
            
            /* Checking whether the book is available or not */
            // Use local state data for availability check
            if ((book_details?.bookCountAvailable > 0 && (transactionType === "Issued" || transactionType === "Reserved")) || (book_details?.bookCountAvailable === 0 && transactionType === "Reserved")) {
                
                const transactionData = {
                    bookId: bookId,
                    borrowerId: borrowerId,
                    borrowerName: borrower_details_res.data.userFullName,
                    bookName: book_details.bookName,
                    transactionType: transactionType, // 'Reserved' or 'Issued'
                    fromDate: fromDateString,
                    toDate: toDateString,
                    isAdmin: user.isAdmin
                }
                
                try {
                    // CRITICAL: The API call that keeps giving 404. 
                    const response = await axios.post(API_URL + "api/transactions/add-transaction", transactionData)
                    
                    if (recentTransactions.length >= 5) {
                        (recentTransactions.splice(-1))
                    }
                    
                    setRecentTransactions([response.data, ...recentTransactions])
                    setBorrowerId("")
                    setBookId("")
                    setTransactionType("")
                    setFromDate(null)
                    setToDate(null)
                    setFromDateString(null)
                    setToDateString(null)
                    
                    // Call the function to re-fetch data
                    // Note: We need a utility function for getTransactions since it's used here and in its useEffect
                    const getTransactionsForUpdate = async () => { // Temporary utility function to satisfy the need for a non-state dependent function call
                        try {
                            const response = await axios.get(API_URL + "api/transactions/all-transactions")
                            setRecentTransactions(response.data.slice(0, 5))
                        }
                        catch (err) {
                            console.log("Error in fetching transactions after update:", err)
                        }
                    }
                    getTransactionsForUpdate(); 

                    getbookDetails(bookId); // Re-fetch book details to update available count
                    
                    alert("Transaction was Successfull 🎉")
                }
                catch (err) {
                    // Now, if the POST fails, we will check the server console for the real error (500)
                    console.error("Failed to submit transaction (check backend console for 500 error):", err.response?.data || err.message);
                }
            }
            else{
                console.warn("The book is not available or transaction type is invalid.")
            }
        }
        else {
            console.warn("Fields must not be empty.")
        }
        setIsLoading(false)
    }


    /* Fetch Transactions */
    useEffect(() => {
        // Defining the function inside useEffect to fix the dependency warning
        const getTransactions = async () => {
            try {
                const response = await axios.get(API_URL + "api/transactions/all-transactions")
                setRecentTransactions(response.data.slice(0, 5))
            }
            catch (err) {
                console.log("Error in fetching transactions:", err)
            }
        }
        getTransactions()
    }, [API_URL])
    
    /* Fetching book details (When a book is selected) */
    useEffect(() => {
        // Defining the function inside useEffect to fix the dependency warning
        const fetchBookDetails = async (id) => {
            try {
                const response = await axios.get(API_URL + "api/books/getbook/" + id)
                setBookDetails(response.data)
            }
            catch (err) {
                console.log("Error in getting book details")
                setBookDetails({}); // Clear on error
            }
        }

        if(bookId !== "") {
            fetchBookDetails(bookId);
        } else {
            setBookDetails({});
        }
    }, [API_URL, bookId])


    /* Fetching borrower details */
    useEffect(() => {
        const getBorrowerDetails = async () => {
            try {
                if (borrowerId !== "") {
                    // Using getuser by ID, assuming borrowerId is the MongoDB _id
                    const response = await axios.get(API_URL + "api/users/getuser/" + borrowerId) 
                    setBorrowerDetails(response.data)
                } else {
                    setBorrowerDetails({}); // Clear details if no borrower selected
                }
            }
            catch (err) {
                console.log("Error in getting borrower details")
            }
        }
        getBorrowerDetails()
    }, [API_URL, borrowerId])


    /* Fetching members */
    useEffect(() => {
        const getMembers = async () => {
            try {
                const response = await axios.get(API_URL + "api/users/allmembers")
                const all_members = await response.data.map(member => (
                    // Assuming member._id is the value you need for borrowerId state
                    { value: `${member?._id}`, text: `${member?.userType === "Student" ? `${member?.userFullName}[${member?.admissionId}]` : `${member?.userFullName}[${member?.employeeId}]`}` }
                ))
                setAllMembers(all_members)
            }
            catch (err) {
                console.log(err)
            }
        }
        getMembers()
    }, [API_URL])


    /* Fetching books */
    useEffect(() => {
        const getallBooks = async () => {
            const response = await axios.get(API_URL + "api/books/allbooks")
            const allbooks = await response.data.map(book => (
                { value: `${book._id}`, text: `${book.bookName}` }
            ))
            setAllBooks(allbooks)
        }
        getallBooks()
    }, [API_URL])


    return (
        <div>
            <p className="dashboard-option-title">Add a Transaction</p>
            <div className="dashboard-title-line"></div>
            <form className='transaction-form' onSubmit={addTransaction}>
                <label className="transaction-form-label" htmlFor="borrowerId">Borrower<span className="required-field">*</span></label><br />
                <div className='semanticdropdown'>
                    <Dropdown
                        placeholder='Select Member'
                        fluid
                        search
                        selection
                        value={borrowerId}
                        options={allMembers}
                        onChange={(event, data) => setBorrowerId(data.value)}
                    />
                </div>
                {/* Borrower Short Info Table */}
                <table className="admindashboard-table shortinfo-table" style={borrowerId === "" ? { display: "none" } : {}}>
                    <tr>
                        <th>Name</th>
                        <th>Issued</th>
                        <th>Reserved</th>
                        <th>Points</th>
                    </tr>
                    <tr>
                        <td>{borrowerDetails.userFullName}</td>
                        <td>{borrowerDetails.activeTransactions?.filter((data) => {
                            return data.transactionType === "Issued" && data.transactionStatus === "Active"
                        }).length
                        }
                        </td>
                        <td>{borrowerDetails.activeTransactions?.filter((data) => {
                            return data.transactionType === "Reserved" && data.transactionStatus === "Active"
                        }).length
                        }
                        </td>
                        <td>{borrowerDetails.points}</td>
                    </tr>
                </table>
                {/* Borrower Active Transactions Table */}
                <table className="admindashboard-table shortinfo-table" style={borrowerId === "" ? { display: "none" } : {}}>
                    <tr>
                        <th>Book-Name</th>
                        <th>Transaction</th>
                        <th>From Date<br /><span style={{ fontSize: "10px" }}>[MM/DD/YYYY]</span></th>
                        <th>To Date<br /><span style={{ fontSize: "10px" }}>[MM/DD/YYYY]</span></th>
                        <th>Fine</th>
                    </tr>
                    {
                        borrowerDetails.activeTransactions?.filter((data) => { return data.transactionStatus === "Active" }).map((data, index) => {
                            return (
                                <tr key={index}>
                                    <td>{data.bookName}</td>
                                    <td>{data.transactionType}</td>
                                    <td>{data.fromDate}</td>
                                    <td>{data.toDate}</td>
                                    <td>{(Math.floor((Date.parse(moment(new Date()).format("MM/DD/YYYY")) - Date.parse(data.toDate)) / 86400000)) <= 0 ? 0 : (Math.floor((Date.parse(moment(new Date()).format("MM/DD/YYYY")) - Date.parse(data.toDate)) / 86400000)) * 10}</td>
                                </tr>
                            )
                        })
                    }
                </table>

                <label className="transaction-form-label" htmlFor="bookName">Book Name<span className="required-field">*</span></label><br />
                <div className='semanticdropdown'>
                    <Dropdown
                        placeholder='Select a Book'
                        fluid
                        search
                        selection
                        options={allBooks}
                        value={bookId}
                        onChange={(event, data) => setBookId(data.value)}
                    />
                </div>
                {/* Book Short Info Table */}
                <table className="admindashboard-table shortinfo-table" style={bookId === "" ? { display: "none" } : {}}>
                    <tr>
                        <th>Available Coipes</th>
                        <th>Reserved</th>
                    </tr>
                    {/* Displaying Book Details from state */}
                    <tr>
                        <td>{bookDetails.bookCountAvailable}</td> 
                        <td>{bookDetails.transactions?.filter(t => t.transactionType === 'Reserved').length || 0}</td>
                    </tr>
                </table>

                <label className="transaction-form-label" htmlFor="transactionType">Transaction Type<span className="required-field">*</span></label><br />
                <div className='semanticdropdown'>
                    <Dropdown
                        placeholder='Select Transaction'
                        fluid
                        selection
                        value={transactionType}
                        options={transactionTypes}
                        onChange={(event, data) => setTransactionType(data.value)}
                    />
                </div>
                <br />

                <label className="transaction-form-label" htmlFor="from-date">From Date<span className="required-field">*</span></label><br />
                <DatePicker
                    className="date-picker"
                    placeholderText="MM/DD/YYYY"
                    selected={fromDate}
                    onChange={(date) => { setFromDate(date); setFromDateString(moment(date).format("MM/DD/YYYY")) }}
                    minDate={new Date()}
                    dateFormat="MM/dd/yyyy"
                />

                <label className="transaction-form-label" htmlFor="to-date">To Date<span className="required-field">*</span></label><br />
                <DatePicker
                    className="date-picker"
                    placeholderText="MM/DD/YYYY"
                    selected={toDate}
                    onChange={(date) => { setToDate(date); setToDateString(moment(date).format("MM/DD/YYYY")) }}
                    minDate={new Date()}
                    dateFormat="MM/dd/yyyy"
                />

                <input className="transaction-form-submit" type="submit" value="SUBMIT" disabled={isLoading}></input>
            </form>
            <p className="dashboard-option-title">Recent Transactions</p>
            <div className="dashboard-title-line"></div>
            <table className="admindashboard-table">
                <tr>
                    <th>S.No</th>
                    <th>Book Name</th>
                    <th>Borrower Name</th>
                    <th>Date</th>
                </tr>
                {
                    recentTransactions.map((transaction, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{transaction.bookName}</td>
                                <td>{transaction.borrowerName}</td>
                                <td>{transaction.updatedAt.slice(0, 10)}</td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}

export default AddTransaction


