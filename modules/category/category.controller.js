const Category = require('./category.model');

exports.createCategory = async(req, res) => {
    try {
        let category = await Category.create(req.body);
        res.status(201).json({ success: true, message: "Category created successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.errors.name.message });
    }
};

exports.getAllCategories = async(req, res) => {
    try {
        const categories = await Category.find();
        res.status(201).json({ success: true, categories });

    } catch (error) {
        res.status(500).json({ success: false, message: error.errors.name.message });

    }
}