import { Requirement } from '../models/Requirement.js';

export async function createRequirement(req, res) {
  try {
    const {
      eventName,
      eventType,
      dateMode,
      startDate,
      endDate,
      location,
      venue,
      category,
      plannerDetails,
      performerDetails,
      crewDetails
    } = req.body;

    if (!eventName || !eventType || !startDate || !location || !category) {
      return res.status(400).json({
        success: false,
        message: 'Missing required event basic fields (eventName, eventType, startDate, location, category)'
      });
    }

    if (!['planner', 'performer', 'crew'].includes(category)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category. Must be planner, performer, or crew.'
      });
    }

    const payload = {
      eventName,
      eventType,
      dateMode: dateMode || 'single',
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : undefined,
      location,
      venue: venue || '',
      category
    };

    if (category === 'planner') {
      if (!plannerDetails || !plannerDetails.scope || !plannerDetails.budgetRange) {
        return res.status(400).json({
          success: false,
          message: 'Planner requirements must include scope and budget range'
        });
      }
      payload.plannerDetails = {
        scope: plannerDetails.scope,
        estimatedGuests: Number(plannerDetails.estimatedGuests) || 50,
        themeStyle: plannerDetails.themeStyle || '',
        budgetRange: plannerDetails.budgetRange,
        deliverables: Array.isArray(plannerDetails.deliverables) ? plannerDetails.deliverables : [],
        additionalNotes: plannerDetails.additionalNotes || ''
      };
    } else if (category === 'performer') {
      if (!performerDetails || !performerDetails.performerType || !performerDetails.budgetRange) {
        return res.status(400).json({
          success: false,
          message: 'Performer requirements must include performerType and budgetRange'
        });
      }
      payload.performerDetails = {
        performerType: performerDetails.performerType,
        performanceDurationHours: Number(performerDetails.performanceDurationHours) || 2,
        genres: Array.isArray(performerDetails.genres) ? performerDetails.genres : [],
        soundEquipment: performerDetails.soundEquipment || 'venue_provided',
        stageDetails: performerDetails.stageDetails || '',
        techRiderRequirements: performerDetails.techRiderRequirements || '',
        budgetRange: performerDetails.budgetRange,
        specialRequests: performerDetails.specialRequests || ''
      };
    } else if (category === 'crew') {
      if (!crewDetails || !crewDetails.roles || !crewDetails.roles.length || crewDetails.budgetPerCrew === undefined) {
        return res.status(400).json({
          success: false,
          message: 'Crew requirements must specify at least one role and budget per crew member'
        });
      }
      payload.crewDetails = {
        roles: crewDetails.roles.map((r) => ({
          roleName: r.roleName,
          count: Number(r.count) || 1,
          callTime: r.callTime || '09:00 AM',
          shiftHours: Number(r.shiftHours) || 8
        })),
        requiredCertifications: Array.isArray(crewDetails.requiredCertifications)
          ? crewDetails.requiredCertifications
          : [],
        equipmentHandling: Array.isArray(crewDetails.equipmentHandling)
          ? crewDetails.equipmentHandling
          : [],
        dressCode: crewDetails.dressCode || 'all_black',
        payRateType: crewDetails.payRateType || 'hourly',
        budgetPerCrew: Number(crewDetails.budgetPerCrew) || 0,
        additionalNotes: crewDetails.additionalNotes || ''
      };
    }

    const requirement = new Requirement(payload);
    const saved = await requirement.save();

    return res.status(201).json({
      success: true,
      message: 'Requirement successfully posted and categorized',
      data: saved
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to create requirement'
    });
  }
}

export async function getRequirements(req, res) {
  try {
    const { category, limit = 20, sort = 'desc' } = req.query;
    const filter = {};
    if (category && ['planner', 'performer', 'crew'].includes(category)) {
      filter.category = category;
    }

    const sortOrder = sort === 'asc' ? 1 : -1;
    const requirements = await Requirement.find(filter)
      .sort({ createdAt: sortOrder })
      .limit(Number(limit));

    const totalCount = await Requirement.countDocuments(filter);

    return res.status(200).json({
      success: true,
      total: totalCount,
      count: requirements.length,
      data: requirements
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch requirements'
    });
  }
}

export async function getRequirementById(req, res) {
  try {
    const { id } = req.params;
    let requirement = null;

    if (id.startsWith('PLA-') || id.startsWith('PER-') || id.startsWith('CRE-') || id.startsWith('REQ-')) {
      requirement = await Requirement.findOne({ referenceId: id });
    } else {
      requirement = await Requirement.findById(id);
    }

    if (!requirement) {
      return res.status(404).json({
        success: false,
        message: 'Requirement not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: requirement
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch requirement details'
    });
  }
}

export async function getRequirementStats(req, res) {
  try {
    const [total, plannerCount, performerCount, crewCount] = await Promise.all([
      Requirement.countDocuments(),
      Requirement.countDocuments({ category: 'planner' }),
      Requirement.countDocuments({ category: 'performer' }),
      Requirement.countDocuments({ category: 'crew' })
    ]);

    return res.status(200).json({
      success: true,
      data: {
        total,
        planner: plannerCount,
        performer: performerCount,
        crew: crewCount
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch requirement stats'
    });
  }
}
