const User = require('../model/userModel')
const expressAsyncHandler = require('express-async-handler')
const validateMongodbId = require('../util/validateID')



//----------------------------------------
//               Create 
//----------------------------------------

const userCreateCtrl = expressAsyncHandler(async (req,res) => {

      try {
  
          const user = await User.create({
              fullName:req?.body?.fullName,
              email:req?.body?.email,
              phoneNumber:req?.body?.phoneNumber,
              job:req?.body?.job
          })
          res.json(user)
  
      } catch (error) {
        return res.status(400).json(error.errors)
  
      }
    
    })

//----------------------------------------
//              Paginate All Users 
//----------------------------------------

const pagination = expressAsyncHandler(async (req, res) => {
    try {
        const allUsers = await User.countDocuments().exec()

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const results = {};

    // calculating the starting and ending index
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;


    if (endIndex < allUsers) {
      results.next = {
        page: page + 1,
        limit: limit
      };
    }

    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
        limit: limit
      };
    }

    results.results = await User.find()
    .sort('_id')
    .skip(startIndex)
    .limit(limit)
    .exec()

    results.currentPage = page

    res.json(results)


    } catch (error) {
        res.error(error)
    }
})

//----------------------------------------
//              All Users 
//----------------------------------------

const allUsersCtrl = expressAsyncHandler(async (req, res) => {
    try {
        const allUsers = await User.find({})
        res.json(allUsers)
    } catch (error) {
        res.error(error)
    }
})

//----------------------------------------
//             Delete User 
//----------------------------------------

const deleteUsersCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    //check if user id is valid
    validateMongodbId(id);
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      res.json(deletedUser);
    } catch (error) {
      res.json(error);
    }
  });

//----------------------------------------
//              Update Profile 
//----------------------------------------
  
  const updateUserCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req?.params;
    validateMongodbId(id);
    const user = await User.findByIdAndUpdate(
      id,
      {
        fullName:req?.body?.fullName,
        email:req?.body?.email,
        phoneNumber:req?.body?.phoneNumber,
        job:req?.body?.job
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(user);
  });

module.exports = {
    userCreateCtrl,
    pagination,
    allUsersCtrl,
    deleteUsersCtrl,
    updateUserCtrl
}