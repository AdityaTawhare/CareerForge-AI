import skillsRepo from './skills.repository.js';
import { ApiError } from '../../utils/ApiError.js';

/**
 * Service: business logic for SkillsTaxonomy.
 * Calls repository for DB access.
 */
export class SkillsService {
  async listSkills({ category, search, page, limit, sort }) {
    // Build filter
    const filter = {};
    if (category)           filter.category = category;
    if (search && !search.includes(' ')) {
      filter.name = new RegExp(search, 'i');
    }

    const skip = (page - 1) * limit;
    const sortObj = { createdAt: -1 };

    let data;
    if (search && search.includes(' ')) {
      // Multi-word → full-text search
      data = await skillsRepo.search(search);
    } else {
      data = await skillsRepo.findAll({ filter, sort: sortObj, skip, limit });
    }

    const total = await skillsRepo.count(filter);
    return { data, total, page, limit };
  }

  async getSkillById(id) {
    const skill = await skillsRepo.findById(id);
    if (!skill) throw ApiError.notFound(`Skill with id "${id}" not found`);
    return skill;
  }

  async createSkill(data) {
    // Check duplicate name
    const existing = await skillsRepo.findByName(data.name);
    if (existing) throw ApiError.conflict(`Skill "${data.name}" already exists`);
    return skillsRepo.create(data);
  }

  async updateSkill(id, data) {
    const skill = await skillsRepo.updateById(id, data);
    if (!skill) throw ApiError.notFound(`Skill with id "${id}" not found`);
    return skill;
  }

  async deleteSkill(id) {
    const skill = await skillsRepo.deleteById(id);
    if (!skill) throw ApiError.notFound(`Skill with id "${id}" not found`);
    return skill;
  }
}

export default new SkillsService();
