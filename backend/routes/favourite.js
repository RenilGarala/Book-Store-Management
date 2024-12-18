const router = require("express").Router();
const User = require("../models/user");
const {authenticateToken} = require("./userAuth")

// add book to favourite
router.put("/add-book-to-favourite",authenticateToken, async(req,res)=>{
    try {
        const {bookid, id} = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid); 
        if(isBookFavourite){
            return res.status(200).json({message: "Book is already in favorites"})
        }
        await User.findByIdAndUpdate(id,{$push:{favourites: bookid}})
        return res.status(200).json({message: "Book added to Favourites"})
    } catch (error) {
        res.status(500).json({ message: "Internal server error Book by id" });
    }
})

//remove book from favourites list
router.put("/remove-book-from-favourite",authenticateToken, async(req,res)=>{
    try {
        const {bookid, id} = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid); 
        if(isBookFavourite){
            await User.findByIdAndUpdate(id,{$pull:{favourites: bookid}})
        }
        return res.status(200).json({message: "Book removed from Favourites"})
    } catch (error) {
        res.status(500).json({ message: "Internal server error Book by id" });
    }
})

//get list of all favourites books
router.get("/get-favourite-books",authenticateToken, async(req,res)=>{
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate("favourites");
        const favouriteBooks = userData.favourites;
        return res.json({
            status: "Success",
            data: favouriteBooks,
        });
    } catch (error) {
        res.status(500).json({ message: "An error occured" });
    }
})

module.exports = router;