import { Request, Response } from 'express';
import { Class } from '../models/Class';
import { AuthRequest } from '../middleware/auth';

export const getClasses = async (req: Request, res: Response) => {
  try {
    const {
      search,
      style,
      level,
      minPrice,
      maxPrice,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 8,
    } = req.query as any;

    // Build filter
    const filter: any = {};

    if (search) {
      filter.$text = { $search: search };
    }

    if (style && style !== 'all') {
      filter.style = style;
    }

    if (level && level !== 'all') {
      filter.level = level;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Sort
    const sort: any = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);
    const total = await Class.countDocuments(filter);

    const classes = await Class.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit))
      .populate('createdBy', 'name email');

    res.status(200).json({
      success: true,
      data: {
        classes,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / Number(limit)),
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch classes',
    });
  }
};

export const getClassById = async (req: Request, res: Response) => {
  try {
    const classItem = await Class.findById(req.params.id).populate(
      'createdBy',
      'name email'
    );

    if (!classItem) {
      return res.status(404).json({
        success: false,
        message: 'Class not found',
      });
    }

    res.status(200).json({
      success: true,
      data: classItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch class',
    });
  }
};

export const createClass = async (req: AuthRequest, res: Response) => {
  try {
    const {
      title,
      shortDescription,
      fullDescription,
      instructor,
      style,
      level,
      price,
      date,
      time,
      location,
      imageUrl,
    } = req.body;

    const classItem = await Class.create({
      title,
      shortDescription,
      fullDescription,
      instructor,
      style,
      level,
      price,
      date,
      time,
      location,
      imageUrl: imageUrl || '',
      createdBy: req.user?.id,
    });

    res.status(201).json({
      success: true,
      data: classItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create class',
    });
  }
};

export const updateClass = async (req: AuthRequest, res: Response) => {
  try {
    const classItem = await Class.findById(req.params.id);

    if (!classItem) {
      return res.status(404).json({
        success: false,
        message: 'Class not found',
      });
    }

    // Check ownership or admin
    if (
      classItem.createdBy.toString() !== req.user?.id &&
      req.user?.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this class',
      });
    }

    const updated = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update class',
    });
  }
};

export const deleteClass = async (req: AuthRequest, res: Response) => {
  try {
    const classItem = await Class.findById(req.params.id);

    if (!classItem) {
      return res.status(404).json({
        success: false,
        message: 'Class not found',
      });
    }

    // Check ownership or admin
    if (
      classItem.createdBy.toString() !== req.user?.id &&
      req.user?.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this class',
      });
    }

    await classItem.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Class deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete class',
    });
  }
};

export const getStyles = async (req: Request, res: Response) => {
  try {
    const styles = await Class.distinct('style');
    res.status(200).json({
      success: true,
      data: styles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch styles',
    });
  }
};