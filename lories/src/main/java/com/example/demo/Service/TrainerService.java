package com.example.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.Trainer;
import com.example.demo.Repository.TrainerRepository;

@Service
public class TrainerService {

    @Autowired
    private TrainerRepository trainerRepository;

    public List<Trainer> getAllTrainer() {
        return trainerRepository.findAll();
    }

    public Trainer saveTrainer(Trainer trainer) {
        return trainerRepository.save(trainer);
    }

    public List<Trainer> getTrainerByEmail(String email) {
        return trainerRepository.findByEmail(email);
    }

    public String deleteTrainer(Long id) {
        trainerRepository.deleteById(id);
        return "Trainer removed !! " + id;
    }

    public Trainer updateTrainer(Long id, Trainer trainerUpdates) {
        Trainer existingTrainer = trainerRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Trainer not found with id: " + id));

        existingTrainer.setName(trainerUpdates.getName());
        existingTrainer.setEmail(trainerUpdates.getEmail());

        return trainerRepository.save(existingTrainer);
    }

    public Trainer getTrainerById(Long id) {
        return trainerRepository.findById(id).orElse(null);
    }
}
