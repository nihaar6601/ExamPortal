package com.example.exam.controller;

import com.example.exam.model.exam.Marks;
import com.example.exam.service.MarksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user/marks")
public class MarksController {

    @Autowired
    private MarksService marksService;

    @CrossOrigin(origins ="http://localhost:4200" , allowCredentials = "true")
    @PostMapping
    public Marks submitMarks(Marks marks){
        System.out.println(marks);
        return marksService.submitMarks(marks);
    }
}
