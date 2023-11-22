package com.example.exam.service;

import com.example.exam.model.exam.Marks;
import com.example.exam.repo.MarksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MarksService {

    @Autowired
    private MarksRepository marksRepository;

    public Marks submitMarks(Marks marks){
        return marksRepository.save(marks);
    }
}
