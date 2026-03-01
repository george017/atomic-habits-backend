const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');

// 1. LEER TODO (Obtener todos los hábitos)
// Esta es la ruta que te faltaba para que el GET /api/habits funcione
router.get('/', async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los hábitos: " + err.message });
  }
});

// 2. CREAR (Alta)
router.post('/', async (req, res) => {
  try {
    const newHabit = new Habit(req.body);
    await newHabit.save();
    res.status(201).json(newHabit);
  } catch (err) {
    res.status(400).json({ error: "Error al crear el hábito: " + err.message });
  }
});

// 3. ACTUALIZAR (Cambios)
router.patch('/:id', async (req, res) => {
  try {
    const updatedHabit = await Habit.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    if (!updatedHabit) return res.status(404).json({ message: "No se encontró el hábito para actualizar" });
    res.json(updatedHabit);
  } catch (err) {
    res.status(400).json({ error: "Error al actualizar: " + err.message });
  }
});

// 4. ELIMINAR (Baja)
router.delete('/:id', async (req, res) => {
  try {
    const result = await Habit.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "No se encontró el hábito para eliminar" });
    res.json({ message: "Hábito eliminado con éxito" });
  } catch (err) {
    res.status(400).json({ error: "Error al eliminar: " + err.message });
  }
});

module.exports = router;