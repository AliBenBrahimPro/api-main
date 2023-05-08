const declarationModel=require('../models/Declaration')
const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')


// @desc    Get all declaration
// @route   GET api/declaration/
// @access  Private
exports.getAlldeclaration=asyncHandler(async(req,res) => {
  let filter = {};
  if (req.filterObj) {
    filter = req.filterObj;
  }
    const page=req.query.page*1 || 1;
    const limit=req.query.limit*1 ||5;
    const skip=(page-1)*limit;
    const declaration = await declarationModel.find(filter).skip(skip).limit(limit);
    res.status(200).json({results:declaration.length,page,data:declaration})
  });

  
// @desc    Get specific declaration by id
// @route   GET api/declaration/:id
// @access  Private
exports.getdeclaration = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const declaration = await declarationModel.findById(id);
  if(!declaration)
  {
    return   next(new ApiError(`declaration not found for this id ${id}`,404)); 
}
  res.status(200).json({data: declaration});
})


// @desc    Create a new declaration
// @route   POST api/declaration/
// @access  Private
exports.createdeclaration=asyncHandler(async(req,res)=>{
    const body=req.body
    const declaration=await declarationModel.create(body)
     res.status(201).json({data:declaration})
   
});

// @desc    update specified declaration
// @route   PUT api/declaration/:id
// @access  Private
exports.updatedeclaration =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;

  const declaration = await declarationModel.findOneAndUpdate(
    {_id:id},
    req.body,
    {new:true})//return apre update
  if(!declaration)
    {
      return   next(new ApiError(`declaration not found for this id ${id}`,404)); 
    }
  res.status(200).json({data: declaration});  
})


// @desc    delete specified declaration
// @route   DELETE api/declaration/:id
// @access  Private
exports.deletedeclaration =asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
   const declaration=await declarationModel.findById(id);
   if(!declaration)
    {
      return   next(new ApiError(`declaration not found for this id ${id}`,404)); 
    }
    const deletes=await declarationModel.deleteOne({_id:id});
  res.status(204).send();  
});
