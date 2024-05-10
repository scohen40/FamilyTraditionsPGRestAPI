const Recipe = require('../models/Recipe');

// 1. URL GET + /api/recipes
exports.list = async(req, res) => {
    const data = await RecipeBook.find({});
    res.status(200).json({
        success:true,
        count: data.length,
        data
    });
}

// 1. URL POST + /api/recipes
exports.create = async(req, res) => {
     const data = await RecipeBook.create(req.body);
     res.status(201).json({
         success:true,
         data
     });
}

// 3. URL GET + /api/recipes/:id
exports.read = async(req, res) => {
    const data = await RecipeBook.findById(req.params.id);
    res.status(200).json({
        success:true,
        data
    });
}

// 4. URL PUT + /api/recipes/:id
exports.update = async(req, res) => {
    const data = await RecipeBook.findByIdAndUpdate(req.params.id, req.body);
    res.status(202).json({
        success:true,
        data
    });
}

// 5. URL DELETE + /api/recipes/:id
exports.delete = async(req, res) => {
    const data = await RecipeBook.deleteOne({_id:req.params.id});
    res.status(data.deletedCount ? 204 : 404).json({
        success: data.deletedCount ? true : false
    });
}