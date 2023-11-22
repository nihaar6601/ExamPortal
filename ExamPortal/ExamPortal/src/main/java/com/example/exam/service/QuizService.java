package com.example.exam.service;

import com.example.exam.model.exam.Category;
import com.example.exam.model.exam.Quiz;
import com.example.exam.repo.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class QuizService {
    @Autowired
    private QuizRepository quizRepository;

    public Quiz addQuiz(Quiz quiz){
        return this.quizRepository.save(quiz);
    }

    public Quiz updateQuiz(Quiz quiz){
        return this.quizRepository.save(quiz);
    }

    public Set<Quiz> getQuizzes(){
        return new HashSet<>(this.quizRepository.findAll());
    }

    public Optional<Quiz> getQuizById(Long quizId){
        return this.quizRepository.findById(quizId);
    }

    public void deleteQuizById(Long quizId){
        this.quizRepository.deleteById(quizId);
    }

    public List<Quiz> getQuizzesOfCategory(Category category){
        return quizRepository.findByCategory(category);
    }

    public List<Quiz> getActiveQuizzes(){
        return quizRepository.findByIsActive(true);
    }

    public List<Quiz> getActiveQuizzesOfCategory(Category category){
        return this.quizRepository.findByCategoryAndIsActive(category , true);
    }


}
