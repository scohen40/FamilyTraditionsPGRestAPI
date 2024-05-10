exports.authorize= (model)=>async(req, res)=>{
    const {owner_id} = await model.findById(id)
    if(owner_id==req.user._id) next()
    throw new Error({error:"Should be owner"})
}