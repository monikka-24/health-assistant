package com.example.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.Doctor;
import com.example.demo.Repository.DoctorRepository;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    public List<Doctor> getAllDoctor() {
        return doctorRepository.findAll();
    }

    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public List<Doctor> getDoctorByEmail(String email) {
        return doctorRepository.findByEmail(email);
    }

    public String deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
        return "Doctor removed !! " + id;
    }

    public Doctor updateDoctor(Long id, Doctor doctorUpdates) {
        Doctor existingDoctor = doctorRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + id));

        existingDoctor.setName(doctorUpdates.getName());
        existingDoctor.setEmail(doctorUpdates.getEmail());

        return doctorRepository.save(existingDoctor);
    }

    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id).orElse(null);
    }
}
