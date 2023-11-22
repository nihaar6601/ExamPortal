package com.example.exam.controller;

import com.example.exam.model.User;
import com.example.exam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @CrossOrigin(origins ="http://localhost:4200" , allowCredentials = "true")
    @GetMapping("/{username}")
    public User getUser(@PathVariable("username") String username){
        return this.userService.getUser(username);
    }

    @CrossOrigin(origins ="http://localhost:4200" , allowCredentials = "true")
    @GetMapping("/allUsers")
    public List<User> getAllUser(String username){
        return this.userService.getAllUsers(username);
    }

    @CrossOrigin(origins ="http://localhost:4200" , allowCredentials = "true")
    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable ("userId") Long userId){
        this.userService.deleteUser(userId);

    }

}
