import SkillsTaxonomy from '../../models/SkillsTaxonomy.js';

/**
 * Repository: all Mongoose queries for SkillsTaxonomy.
 * No business logic here — only DB access.
 */
export class SkillsRepository {
  async findAll({ filter = {}, sort = { createdAt: -1 }, skip = 0, limit = 20 }) {
    return SkillsTaxonomy.find(filter).sort(sort).skip(skip).limit(limit).lean();
  }

  async count(filter = {}) {
    return SkillsTaxonomy.countDocuments(filter);
  }

  async findById(id) {
    return SkillsTaxonomy.findById(id).lean();
  }

  async findByName(name) {
    return SkillsTaxonomy.findOne({ name: new RegExp(`^${name}$`, 'i') }).lean();
  }

  async create(data) {
    const skill = new SkillsTaxonomy(data);
    return skill.save();
  }

  async updateById(id, data) {
    return SkillsTaxonomy.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true }).lean();
  }

  async deleteById(id) {
    return SkillsTaxonomy.findByIdAndDelete(id).lean();
  }

  async search(query) {
    return SkillsTaxonomy.find({ $text: { $search: query } }, { score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } })
      .limit(20)
      .lean();
  }
}

export default new SkillsRepository();
