const RecipeBook = require('../models/RecipeBook');

// 1. URL GET + /api/recipe_books
exports.list = async(req, res) => {
    const data = await RecipeBook.find({});
    res.status(200).json({
        success:true,
        count: data.length,
        data
    });
}

// 2. URL POST + /api/recipe_books
exports.create = async(req, res) => {
     const userId = req.user.id; // Assuming the user id is available in req.user.id
     const data = await RecipeBook.create({ ...req.body, userId });
     res.status(201).json({
         success:true,
         data
     });
}

// 3. URL GET + /api/recipe_books/:id
exports.read = async(req, res) => {
    const data = await RecipeBook.findById(req.params.id);
    res.status(200).json({
        success:true,
        data
    });
}

// 4. URL PUT + /api/recipe_books/:id
exports.update = async(req, res) => {
    const data = await RecipeBook.findByIdAndUpdate(req.params.id, req.body);
    res.status(202).json({
        success:true,
        data
    });
}

// 5. URL DELETE + /api/recipe_books/:id
exports.delete = async(req, res) => {
    const data = await RecipeBook.deleteOne({_id:req.params.id});
    res.status(data.deletedCount ? 204 : 404).json({
        success: data.deletedCount ? true : false
    });
}