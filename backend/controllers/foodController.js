const axios = require('axios');
const FormData = require('form-data');
const ScanHistory = require('../models/ScanHistory');

// @desc    Analyze uploaded food image
// @route   POST /api/food/analyze
// @access  Private
const analyzeFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image file' });
    }

    // Prepare FormData to send the file buffer to Spoonacular
    const formData = new FormData();
    formData.append('file', req.file.buffer, req.file.originalname);

    // Call Spoonacular Analyze API
    let analyzeData;
    try {
      const response = await axios.post(
        `https://api.spoonacular.com/food/images/analyze?apiKey=${process.env.SPOONACULAR_API_KEY}`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
        }
      );
      analyzeData = response.data;
    } catch (apiErr) {
      console.error('Spoonacular image analyze error:', apiErr.response?.data || apiErr.message);
      return res.status(502).json({ message: 'Failed to analyze image from external API' });
    }

    const foodName = analyzeData.category?.name || 'Unknown Food';
    const confidence = Math.round((analyzeData.category?.probability || 0.8) * 100);

    // Call Spoonacular Guess Nutrition API
    let nutritionData = {};
    if (foodName !== 'Unknown Food') {
      try {
        const nutResponse = await axios.get(
          `https://api.spoonacular.com/recipes/guessNutrition?title=${encodeURIComponent(foodName)}&apiKey=${process.env.SPOONACULAR_API_KEY}`
        );
        nutritionData = nutResponse.data;
      } catch (nutErr) {
        console.error('Spoonacular nutrition guess error:', nutErr.response?.data || nutErr.message);
      }
    }

    // Format nutrition based on our schema
    const formattedNutrition = {
      calories: Math.round(nutritionData.calories?.value || 200),
      protein: Math.round(nutritionData.protein?.value || 10),
      carbs: Math.round(nutritionData.carbs?.value || 30),
      fat: Math.round(nutritionData.fat?.value || 10),
      fiber: 5, // Static fallback 
      sugar: Math.round((nutritionData.carbs?.value || 30) * 0.2), // Simple estimate
      sodium: 300, // Static fallback
      vitamins: {
        "Vitamin A": 12,
        "Vitamin C": 8,
        "Vitamin B6": 6
      },
      minerals: {
        "Calcium": 150,
        "Iron": 8,
        "Magnesium": 40,
        "Potassium": 300
      }
    };

    // Save scan to database
    const scanRecord = await ScanHistory.create({
      user: req.user.id,
      foodName,
      confidence,
      nutrition: formattedNutrition
    });

    res.status(200).json({
      scanId: scanRecord._id,
      foodName,
      confidence,
      nutrition: formattedNutrition
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user scan history
// @route   GET /api/food/history
// @access  Private
const getScanHistory = async (req, res) => {
  try {
    const history = await ScanHistory.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  analyzeFood,
  getScanHistory
};
