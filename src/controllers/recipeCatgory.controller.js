import RecipeCategory from '../models/recipeCategory.model';
import {
  successResponse,
  excludeProperty,
  errorResponse,
} from '../utils/helpers';

// import client from '../db/redis';

/**
 * Create A recipe category
 * @param {object} req
 * @param {object} res
 * @returns {object} recipe category object
 */
export async function createRecipeCategory(req, res) {
  const { category, description } = req.body;
  const { _id } = req.user;

  const newRecipeCategory = new RecipeCategory({
    createdBy: _id,
    category,
    description,
  });
  const categories = await newRecipeCategory.save();

  const categoryJSON = categories.toJSON();

  const creatededCategories = excludeProperty(categoryJSON, ['__v', 'date']);
  successResponse(res, 201, 'Recipe category created', creatededCategories);
}

/**
 * Create A recipe category
 * @param {object} req
 * @param {object} res
 * @returns {object} recipe category object
 */
export async function editRecipeCategory(req, res) {
  const { category, description } = req.body;
  const { categoryId } = req.params;

  const categoryExists = await RecipeCategory.findOne({ _id: categoryId });
  if (!categoryExists) {
    return errorResponse(res, 404, 'This category does not exist');
  }

  const updatedCategory = await RecipeCategory.findOneAndUpdate(
    { _id: categoryId },
    { category, description },
    { new: true },
  );

  const updatedCategoryJSON = updatedCategory.toJSON();

  const updatedCategoryData = excludeProperty(updatedCategoryJSON, [
    '__v',
    'date',
  ]);

  return successResponse(
    res,
    201,
    'Recipe category has been updated',
    updatedCategoryData,
  );
}

/**
 * Create A recipe category
 * @param {object} req
 * @param {object} res
 * @returns {object} recipe category object
 */
export async function deleteRecipeCategory(req, res) {
  const { categoryId } = req.params;
  const categoryExists = await RecipeCategory.findOne({ _id: categoryId });
  if (!categoryExists) {
    return errorResponse(res, 404, 'This category does not exist');
  }
  const deletedCategory = await RecipeCategory.findOneAndDelete({
    _id: categoryId,
  });
  return successResponse(
    res,
    201,
    'Recipe category has been deleted',
    deletedCategory,
  );
}

/**
 * Create A recipe category
 * @param {object} req
 * @param {object} res
 * @returns {object} recipe category object
 */
export async function getRecipeCategory(req, res) {
  const { categoryId } = req.params;
  const categoryExists = await RecipeCategory.findOne({ _id: categoryId });
  if (!categoryExists) {
    return errorResponse(res, 404, 'This category does not exist');
  }
  return successResponse(res, 201, 'Recipe Category', categoryExists);
}
