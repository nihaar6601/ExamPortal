package com.example.exam.service;

import com.example.exam.model.User;
import com.example.exam.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUser(String username) {
        return this.userRepository.findByUsername(username);
    }


    public void deleteUser(Long userId) {
        this.userRepository.deleteById(userId);
    }


    public List<User> getAllUsers(String username) {
        return this.userRepository.findAll();
    }
}
