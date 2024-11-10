package com.example.demo.Service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.Model.User;
import com.example.demo.Repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public String deleteUser(Long id) {
        userRepository.deleteById(id);
        return "User removed !! " + id;
    }

    public User updateUser(Long id, User userUpdates) {
        User existingUser = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        existingUser.setName(userUpdates.getName());
        existingUser.setEmail(userUpdates.getEmail());

        return userRepository.save(existingUser);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
}
