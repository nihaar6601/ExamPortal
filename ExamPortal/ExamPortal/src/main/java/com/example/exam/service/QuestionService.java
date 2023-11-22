package com.example.exam.service;

import com.example.exam.model.exam.Question;
import com.example.exam.model.exam.Quiz;
import com.example.exam.repo.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class QuestionService {
    @Autowired
    private QuestionRepository questionRepository;

    public Question addQuestion(Question question){
        return this.questionRepository.save(question);
    }

    public Question updateQuestion(Question question){
        return this.questionRepository.save(question);
    }

    public Set<Question> getQuestions(){
        return new HashSet<>(this.questionRepository.findAll());
    }

    public Optional<Question> getQuestionById(Long quesId){
        return this.questionRepository.findById(quesId);
    }

    public Set<Question> getQuestionsOfQuiz(Quiz question){
        return this.questionRepository.findByQuiz(question);
    }

    public void deleteQuestionById(Long quesId){
        Question quiz = new Question();
        quiz.setQuesId(quesId);
        this.questionRepository.delete(quiz);
    }

    public Question getQuestion(Long questionId){
        return questionRepository.getOne(questionId);
    }
}
