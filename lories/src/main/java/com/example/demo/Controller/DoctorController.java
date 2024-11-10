package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Model.Doctor;
import com.example.demo.Service.DoctorService;

@RestController
@RequestMapping("/api/doctor")
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorController {

    @Autowired
    private DoctorService dService;

    @GetMapping("/get")
    public List<Doctor> findAllDoctor() {
        return dService.getAllDoctor();
    }

    @PostMapping("/signup")
    public Doctor signup(@RequestBody Doctor doctor) {
        return dService.saveDoctor(doctor);
    }

    @PostMapping("/login")
    public Doctor login(@RequestBody Doctor doctor) {
        List<Doctor> doctorsWithEmail = dService.getDoctorByEmail(doctor.getEmail());
        if (doctorsWithEmail.size() == 1 && doctorsWithEmail.get(0).getPassword().equals(doctor.getPassword())) {
            return doctorsWithEmail.get(0);
        } else if (doctorsWithEmail.isEmpty()) {
            throw new RuntimeException("Doctor not found");
        } else {
            throw new RuntimeException("Multiple doctors found with the same email. Please contact support.");
        }
    }

    @PutMapping("/put/{id}")
    public Doctor updateDoctor(@RequestBody Doctor doctor, @PathVariable Long id) {
        return dService.updateDoctor(id, doctor);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteDoctor(@PathVariable Long id) {
        return dService.deleteDoctor(id);
    }

    @GetMapping("/{id}")
    public Doctor getDoctorById(@PathVariable Long id) {
        return dService.getDoctorById(id);
    }
}
