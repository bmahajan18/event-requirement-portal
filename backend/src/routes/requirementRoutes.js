import express from 'express';
import {
  createRequirement,
  getRequirements,
  getRequirementById,
  getRequirementStats
} from '../controllers/requirementController.js';

const router = express.Router();

router.post('/', createRequirement);
router.get('/', getRequirements);
router.get('/stats', getRequirementStats);
router.get('/:id', getRequirementById);

export default router;
