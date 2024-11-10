package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Model.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long>{

}
