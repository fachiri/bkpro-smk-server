const express = require('express');
const router = express.Router();

const Question = require('../models/competency.model');

router.get('/', async (req, res) => {
  try {
    const currentPage = parseInt(req.query.current_page) || 1;
    const perPage = parseInt(req.query.per_page) || 10;

    const totalQuestions = await Question.countDocuments();
    const totalPages = Math.ceil(totalQuestions / perPage);

    const questions = await Question.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    let nextUrl = null;
    let prevUrl = null;

    if (currentPage < totalPages) {
      nextUrl = `/questions?current_page=${currentPage + 1}&per_page=${perPage}`;
    }

    if (currentPage > 1) {
      prevUrl = `/questions?current_page=${currentPage - 1}&per_page=${perPage}`;
    }

    const pagination = {
      current_page: currentPage,
      next_page: nextUrl,
      previous_page: prevUrl,
      total_pages: totalPages,
      per_page: perPage,
      total_entries: totalQuestions
    };

    res.status(200).json({
      success: true,
      message: 'Data found',
      data: {
        questions,
        pagination
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error while retrieving data',
      error: error.message
    });
  }
});

module.exports = router;
