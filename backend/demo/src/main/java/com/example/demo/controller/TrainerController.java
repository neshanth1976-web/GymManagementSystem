package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Trainer;
import com.example.demo.repository.TrainerRepository;

@CrossOrigin(origins = {
    "http://127.0.0.1:5500",
    "https://gym-management-system-bh5o.onrender.com"
})
@RestController
@RequestMapping("/trainers")
public class TrainerController {

    private final TrainerRepository trainerRepository;

    public TrainerController(TrainerRepository trainerRepository) {
        this.trainerRepository = trainerRepository;
    }

    // Get all trainers
    @GetMapping
    public List<Trainer> getTrainers() {
        return trainerRepository.findAll();
    }

    // Get trainer by ID
    @GetMapping("/{id}")
    public Trainer getTrainerById(@PathVariable Long id) {
        return trainerRepository.findById(id).orElse(null);
    }

    // Add trainer
    @PostMapping
    public Trainer addTrainer(@RequestBody Trainer trainer) {
        return trainerRepository.save(trainer);
    }

    // Update trainer
    @PutMapping("/{id}")
    public Trainer updateTrainer(@PathVariable Long id, @RequestBody Trainer trainer) {
        trainer.setId(id);
        return trainerRepository.save(trainer);
    }

    // Delete trainer
    @DeleteMapping("/{id}")
    public String deleteTrainer(@PathVariable Long id) {
        trainerRepository.deleteById(id);
        return "Trainer deleted successfully";
    }
}