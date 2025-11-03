const checkExist = (Model) => {
  return async (req, res, next) => {
    const { id } = req.params;
    try {
      const record = await Model.findByPk(id);
      if (!record) {
        return res.status(404).json({ error: `${Model.name} not found` });
      }
      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};

module.exports = checkExist;
