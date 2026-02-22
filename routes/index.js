const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');

// 1. CREAR (Alta) 
router.post('/', async (req, res) => {
  try {
    const newHabit = new Habit(req.body);
    await newHabit.save();
    res.status(201).json(newHabit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 2. ELIMINAR (Baja) 
router.delete('/:id', async (req, res) => {
  try {
    const result = await Habit.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "No se encontró el hábito" });
    res.json({ message: "Hábito eliminado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 3. ACTUALIZAR (Cambios) 
router.patch('/:id', async (req, res) => {
  try {
    const updatedHabit = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedHabit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;