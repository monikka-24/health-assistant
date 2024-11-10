package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.Appointment;
import com.example.demo.Service.AppointmentService;

@RestController
@RequestMapping("/api/appointment")
@CrossOrigin(origins = "http://localhost:3000")
public class AppointmentController {
	@Autowired
	private AppointmentService appointmentService;
	
	@PostMapping("/post")
    public Appointment signup(@RequestBody Appointment appointment) {
        return appointmentService.saveAppointment(appointment);
    }
}
