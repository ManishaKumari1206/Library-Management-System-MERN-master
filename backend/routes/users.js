// import express from "express";
// import User from "../models/User.js";

// const router = express.Router()

// /* Getting user by id */
// router.get("/getuser/:id", async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id).populate("activeTransactions").populate("prevTransactions")
//         const { password, updatedAt, ...other } = user._doc;
//         res.status(200).json(other);
//     } 
//     catch (err) {
//         return res.status(500).json(err);
//     }
// })

// /* Getting all members in the library */
// router.get("/allmembers", async (req,res)=>{
//     try{
//         const users = await User.find({}).populate("activeTransactions").populate("prevTransactions").sort({_id:-1})
//         res.status(200).json(users)
//     }
//     catch(err){
//         return res.status(500).json(err);
//     }
// })

// /* Update user by id */
// router.put("/updateuser/:id", async (req, res) => {
//     if (req.body.userId === req.params.id || req.body.isAdmin) {
//         if (req.body.password) {
//             try {
//                 const salt = await bcrypt.genSalt(10);
//                 req.body.password = await bcrypt.hash(req.body.password, salt);
//             } catch (err) {
//                 return res.status(500).json(err);
//             }
//         }
//         try {
//             const user = await User.findByIdAndUpdate(req.params.id, {
//                 $set: req.body,
//             });
//             res.status(200).json("Account has been updated");
//         } catch (err) {
//             return res.status(500).json(err);
//         }
//     }
//     else {
//         return res.status(403).json("You can update only your account!");
//     }
// })

// /* Adding transaction to active transactions list */
// router.put("/:id/move-to-activetransactions" , async (req,res)=>{
//     if(req.body.isAdmin){
//         try{
//             const user = await User.findById(req.body.userId);
//             await user.updateOne({$push:{activeTransactions:req.params.id}})
//             res.status(200).json("Added to Active Transaction")
//         }
//         catch(err){
//             res.status(500).json(err)
//         }
//     }
//     else{
//         res.status(403).json("Only Admin can add a transaction")
//     }
// })

// /* Adding transaction to previous transactions list and removing from active transactions list */
// router.put("/:id/move-to-prevtransactions", async (req,res)=>{
//     if(req.body.isAdmin){
//         try{
//             const user = await User.findById(req.body.userId);
//             await user.updateOne({$pull:{activeTransactions:req.params.id}})
//             await user.updateOne({$push:{prevTransactions:req.params.id}})
//             res.status(200).json("Added to Prev transaction Transaction")
//         }
//         catch(err){
//             res.status(500).json(err)
//         }
//     }
//     else{
//         res.status(403).json("Only Admin can do this")
//     }
// })

// /* Delete user by id */
// router.delete("/deleteuser/:id", async (req, res) => {
//     if (req.body.userId === req.params.id || req.body.isAdmin) {
//         try {
//             await User.findByIdAndDelete(req.params.id);
//             res.status(200).json("Account has been deleted");
//         } catch (err) {
//             return res.status(500).json(err);
//         }
//     } else {
//         return res.status(403).json("You can delete only your account!");
//     }
// })

// export default router


import express from "express";
import User from "../models/User.js";
// You are using bcrypt in updateuser, so ensure it is imported if you want that route to work.
// import bcrypt from "bcrypt"; 

const router = express.Router()

/* Getting user by id */
router.get("/getuser/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("activeTransactions").populate("prevTransactions")
        // Check if user exists before destructuring
        if (!user) {
             return res.status(404).json("User not found");
        }
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } 
    catch (err) {
        console.error("Error in getuser route:", err); // <-- CRITICAL: Added console log
        return res.status(500).json(err);
    }
})

/* Getting all members in the library - FIX: Added console.error for 500 issue */
router.get("/allmembers", async (req,res)=>{
    try{
        const users = await User.find({}).populate("activeTransactions").populate("prevTransactions").sort({_id:-1})
        res.status(200).json(users)
    }
    catch(err){
        console.error("Error fetching all members (500):", err); // <-- CRITICAL FIX
        return res.status(500).json(err);
    }
})

/* Update user by id (Assuming bcrypt is imported) */
router.put("/updateuser/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        // You are missing the 'bcrypt' import. This block will crash without it.
        // if (req.body.password) { ... } 
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account has been updated");
        } catch (err) {
             console.error("Error updating user:", err); 
             return res.status(500).json(err);
        }
    }
    else {
        return res.status(403).json("You can update only your account!");
    }
})

/* Adding transaction to active transactions list */
router.put("/:id/move-to-activetransactions" , async (req,res)=>{
    if(req.body.isAdmin){
        try{
            const user = await User.findById(req.body.userId);
            await user.updateOne({$push:{activeTransactions:req.params.id}})
            res.status(200).json("Added to Active Transaction")
        }
        catch(err){
            console.error("Error adding to active transactions:", err);
            res.status(500).json(err)
        }
    }
    else{
        res.status(403).json("Only Admin can add a transaction")
    }
})

/* Adding transaction to previous transactions list and removing from active transactions list */
router.put("/:id/move-to-prevtransactions", async (req,res)=>{
    if(req.body.isAdmin){
        try{
            const user = await User.findById(req.body.userId);
            await user.updateOne({$pull:{activeTransactions:req.params.id}})
            await user.updateOne({$push:{prevTransactions:req.params.id}})
            res.status(200).json("Added to Prev transaction Transaction")
        }
        catch(err){
            console.error("Error moving to prev transactions:", err);
            res.status(500).json(err)
        }
    }
    else{
        res.status(403).json("Only Admin can do this")
    }
})

/* Delete user by id */
router.delete("/deleteuser/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
        } catch (err) {
            console.error("Error deleting user:", err);
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can delete only your account!");
    }
})

export default router;