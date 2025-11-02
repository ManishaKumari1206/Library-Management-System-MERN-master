import express from "express"
import Book from "../models/Book.js"
import BookTransaction from "../models/BookTransaction.js"
// CRITICAL: Must import the User model to update their transaction arrays
import User from "../models/User.js" 

const router = express.Router()

router.post("/add-transaction", async (req, res) => {
    if (!req.body.isAdmin) {
        return res.status(403).json("You are not allowed to add a Transaction.");
    }

    try {
        const {
            bookId,
            borrowerId, // EmployeeId or AdmissionId
            bookName,
            borrowerName,
            transactionType, // "Issue" or "Reserve"
            fromDate,
            toDate
        } = req.body;

        if (!bookId || !borrowerId || !bookName || !borrowerName || !transactionType || !fromDate || !toDate) {
            return res.status(400).json({ message: "Missing required transaction fields." });
        }

        // 2. Create the new transaction
        const newTransaction = new BookTransaction({
            bookId,
            borrowerId,
            bookName,
            borrowerName,
            transactionType,
            fromDate,
            toDate,
            transactionStatus: "Active"
        });
        const transaction = await newTransaction.save()

        // 3. Update the Book: Push transaction ID to the book's list
        await Book.findByIdAndUpdate(
            bookId,
            { $push: { transactions: transaction._id } }
        );

        // 4. CRITICAL: Update the User: Push transaction ID to the user's activeTransactions list
        // Assuming borrowerId maps to employeeId/admissionId on the User model
        await User.findOneAndUpdate(
            { employeeId: borrowerId }, 
            { $push: { activeTransactions: transaction._id } }
        );

        // 5. CRITICAL: Update Book Count if it's an Issue
        if (transactionType === "Issue") {
            await Book.findByIdAndUpdate(
                bookId,
                { $inc: { bookCountAvailable: -1 } } // Decrement the count
            );
        }

        res.status(200).json(transaction)
    }
    catch (err) {
        console.error("Error in add-transaction:", err);
        // Use 500 for internal server errors
        res.status(500).json({ message: "Failed to add transaction due to a server error.", error: err.message });
    }
})

// Route 2: GET /api/transactions/all-transactions
router.get("/all-transactions", async (req, res) => {
    try {
        // Renamed from all-active-transactions to match your route name
        const transactions = await BookTransaction.find({}).sort({ _id: -1 }) 
        res.status(200).json(transactions)
    }
    catch (err) {
        // Use 500 for internal server errors
        return res.status(500).json({ message: "Failed to fetch transactions.", error: err.message });
    }
})

// Route 3: PUT /api/transactions/update-transaction/:id
router.put("/update-transaction/:id", async (req, res) => {
    try {
        if (req.body.isAdmin) {
            await BookTransaction.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Transaction details updated successfully");
        } else {
             return res.status(403).json("You dont have permission to update a transaction!");
        }
    }
    catch (err) {
        console.error("Error in update-transaction:", err);
        res.status(500).json({ message: "Failed to update transaction due to a server error.", error: err.message });
    }
})

// Route 4: DELETE /api/transactions/remove-transaction/:id (Likely used for canceling a reserve or fixing an error)
router.delete("/remove-transaction/:id", async (req, res) => {
    if (!req.body.isAdmin) {
        return res.status(403).json("You don't have permission to delete a transaction!");
    }

    try {
        // Find the transaction data before deleting
        const data = await BookTransaction.findById(req.params.id);

        if (!data) {
             return res.status(404).json("Transaction not found.");
        }

        // 1. Delete the transaction
        await BookTransaction.findByIdAndDelete(req.params.id);

        // 2. Remove transaction ID from the Book's transactions list
        await Book.findByIdAndUpdate(
            data.bookId,
            { $pull: { transactions: req.params.id } }
        );

        // 3. Remove transaction ID from the User's activeTransactions list
        // Assuming borrowerId maps to employeeId/admissionId on the User model
        await User.findOneAndUpdate(
            { employeeId: data.borrowerId }, 
            { $pull: { activeTransactions: req.params.id } }
        );

        // 4. CRITICAL: If the transaction was an "Issue" (and therefore decremented stock), increment stock back
        // You might need a more robust check here, but based on the schema, checking status is best.
        if (data.transactionType === "Issue" && data.transactionStatus === "Active") {
            await Book.findByIdAndUpdate(
                data.bookId,
                { $inc: { bookCountAvailable: 1 } } // Increment the count back
            );
        }

        res.status(200).json("Transaction deleted successfully");
    } catch (err) {
        console.error("Error in remove-transaction:", err);
        return res.status(500).json({ message: "Failed to delete transaction due to a server error.", error: err.message });
    }
})

export default router;
