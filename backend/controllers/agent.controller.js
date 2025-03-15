// controllers/agentController.js
const agentService = require('../services/agent.service');

const agentController = {
  // Create a new Agent
  async create(req, res) {
    const {name, image, instructions} = req.body;
    try {
      const agent = await agentService.createAgent({name, image, instructions});
      return res.status(201).json(agent);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to create agent.' });
    }
  },

  // Get all Agents
  async getAll(req, res) {
    try {
      const agents = await agentService.getAllAgents();
      return res.json(agents);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to fetch agents.' });
    }
  },

  // Get a single Agent by ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const agent = await agentService.getAgentById(id);

      if (!agent) {
        return res.status(404).json({ error: 'Agent not found.' });
      }

      return res.json(agent);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to fetch agent.' });
    }
  },

  // Update an Agent
  async update(req, res) {
    try {
      const { id } = req.params;
      const agent = await agentService.updateAgent(id, req.body);

      if (!agent) {
        return res.status(404).json({ error: 'Agent not found.' });
      }

      return res.json(agent);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to update agent.' });
    }
  },

  // Delete an Agent
  async delete(req, res) {
    try {
      const { id } = req.params;
      const rowsDeleted = await agentService.deleteAgent(id);

      if (rowsDeleted === 0) {
        return res.status(404).json({ error: 'Agent not found.' });
      }

      return res.status(204).send(); // No Content
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to delete agent.' });
    }
  },
};

module.exports = agentController;