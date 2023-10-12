const express = require('express');
const router = express.Router();

const db = require('../models');
const { getCompetenciesByMajor } = require('../utils/model.util');

router.post('/', async (req, res) => {
  try {
    const { facts, majorCode } = req.body

    const major = await db.Major.findOne({
      where: {
        code: majorCode
      }
    })

    const data = await getInferenceResponse(facts, major.id)

    res.status(200).json({
      success: true,
      message: 'Data retrieved',
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: {}
    });
  }
});

module.exports = router;

const getInferenceResponse = async (facts, majorId) => {
  if (!facts) {
    const questions = await getCompetenciesByMajor(majorId, ['KT1', 'KT5', 'KT8', 'KT12'])
    return {
      questions,
      facts
    }
  }

  const nextQuestions = await getNextQuestion(facts)
  if (nextQuestions.length === 0) {
    let conclutions = []
    conclutionRules.forEach(rule => {
      rule.if(facts) ? conclutions.push(rule.then) : null
    });

    if (conclutions.length === 0 ) {
      return {
        isFinish: true,
        professions: [{
          code: 'P0',
          profession: 'There is no profession that matches your competence.'
        }],
        facts
      };
    }
    
    const professions = await db.Profession.findAll({ 
      where: {
        code: conclutions,
        majorId 
      },
      attributes: ['code', 'profession']
    })
    return {
      isFinish: true,
      professions,
      facts
    };
  } else {
    const questions = await db.Competency.findAll({ 
      where: {
        code: nextQuestions 
      },
      attributes: ['code', 'competency']
    })
    return {
      questions,
      facts
    }
  }
}

const getNextQuestion = async (facts) => {
  let nextQuestions = []
  if (facts.KT1 && facts.KT2 === undefined) nextQuestions.push('KT2');
  if (facts.KT2 && facts.KT3 === undefined) nextQuestions.push('KT3');
  if (facts.KT3 && facts.KT4 === undefined) nextQuestions.push('KT4');

  if (facts.KT5 && facts.KT6 === undefined) nextQuestions.push('KT6');
  if (facts.KT6 && facts.KT7 === undefined) nextQuestions.push('KT7');

  if (facts.KT8 && facts.KT9 === undefined) nextQuestions.push('KT9');
  if (facts.KT9 && facts.KT10 === undefined) nextQuestions.push('KT10');
  if (facts.KT10 && facts.KT11 === undefined) nextQuestions.push('KT11');

  if (facts.KT12 && facts.KT13 === undefined) nextQuestions.push('KT13');
  if (facts.KT13 && facts.KT14 === undefined) nextQuestions.push('KT14');
  if (facts.KT14 && facts.KT15 === undefined) nextQuestions.push('KT15');
  if (facts.KT15 && facts.KT16 === undefined) nextQuestions.push('KT16');
  if (facts.KT16 && facts.KT17 === undefined) nextQuestions.push('KT17');
  if (facts.KT17 && facts.KT18 === undefined) nextQuestions.push('KT18');
  if (facts.KT18 && facts.KT19 === undefined) nextQuestions.push('KT19');
  if (facts.KT19 && facts.KT20 === undefined) nextQuestions.push('KT20');
  if (facts.KT20 && facts.KT21 === undefined) nextQuestions.push('KT21');
  if (facts.KT21 && facts.KT22 === undefined) nextQuestions.push('KT22');
  return nextQuestions
};  

const conclutionRules = [
  {
    if: (facts) => facts.KT1 && facts.KT2 && facts.KT3,
    then: 'P1'
  },
  {
    if: (facts) => facts.KT1 && facts.KT2 && facts.KT3 && facts.KT4,
    then: 'P2'
  },
  {
    if: (facts) => facts.KT5 && facts.KT6 && facts.KT7,
    then: 'P3'
  },
  {
    if: (facts) => facts.KT8 && facts.KT9 && facts.KT10  && facts.KT11,
    then: 'P4'
  },
  {
    if: (facts) => facts.KT12 && facts.KT13 && facts.KT14 && facts.KT15 && facts.KT16 && facts.KT17 && facts.KT18 && facts.KT19 && facts.KT20 && facts.KT21 && facts.KT22,
    then: 'P5'
  }
]
