package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Model.Trainer;
import com.example.demo.Service.TrainerService;

@RestController
@RequestMapping("/api/trainer")
@CrossOrigin(origins = "http://localhost:3000")
public class TrainerController {

    @Autowired
    private TrainerService trainerService;

    @GetMapping("/get")
    public List<Trainer> findAllTrainer() {
        return trainerService.getAllTrainer();
    }

    @PostMapping("/signup")
    public Trainer signup(@RequestBody Trainer trainer) {
        return trainerService.saveTrainer(trainer);
    }

    @PostMapping("/login")
    public Trainer login(@RequestBody Trainer trainer) {
        List<Trainer> trainersWithEmail = trainerService.getTrainerByEmail(trainer.getEmail());
        if (trainersWithEmail.size() == 1 && trainersWithEmail.get(0).getPassword().equals(trainer.getPassword())) {
            return trainersWithEmail.get(0);
        } else if (trainersWithEmail.isEmpty()) {
            throw new RuntimeException("Trainer not found");
        } else {
            throw new RuntimeException("Multiple trainers found with the same email. Please contact support.");
        }
    }

    @PutMapping("/put/{id}")
    public Trainer updateTrainer(@RequestBody Trainer trainer, @PathVariable Long id) {
        return trainerService.updateTrainer(id, trainer);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteTrainer(@PathVariable Long id) {
        return trainerService.deleteTrainer(id);
    }

    @GetMapping("/{id}")
    public Trainer getTrainerById(@PathVariable Long id) {
        return trainerService.getTrainerById(id);
    }
}
