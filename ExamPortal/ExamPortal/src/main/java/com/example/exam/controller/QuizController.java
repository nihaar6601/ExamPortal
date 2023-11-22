package com.example.exam.controller;

import com.example.exam.model.exam.Category;
import com.example.exam.model.exam.Quiz;
import com.example.exam.service.CategoryService;
import com.example.exam.service.QuizService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/quiz")
//@CrossOrigin("*")
public class QuizController {
    @Autowired
    private QuizService quizService;

    @CrossOrigin(origins = "http://localhost:4200"  , allowCredentials = "true")
    @PostMapping
    public ResponseEntity<Quiz> addQuiz(@RequestBody Quiz quiz){
        Quiz quiz1 = this.quizService.addQuiz(quiz);
        return ResponseEntity.ok(quiz1);
    }

    @CrossOrigin(origins = "http://localhost:4200"  , allowCredentials = "true")
    @GetMapping("/{quizId}")
    public Optional<Quiz> getQuiz(@PathVariable("quizId") Long quizId ){
        return quizService.getQuizById(quizId);
    }

    @CrossOrigin(origins = "http://localhost:4200"  , allowCredentials = "true")
    @GetMapping
    public ResponseEntity<?> getQuizzes(){
        return ResponseEntity.ok(this.quizService.getQuizzes());
    }

    @CrossOrigin(origins = "http://localhost:4200"  , allowCredentials = "true")
    @PutMapping
    public Quiz updateQuiz(@RequestBody Quiz quiz){
        return this.quizService.updateQuiz(quiz);
    }

    @CrossOrigin(origins = "http://localhost:4200"  , allowCredentials = "true")
    @DeleteMapping("/{quizId}")
    public void deleteQuiz(@PathVariable("quizId") Long quizId){
        this.quizService.deleteQuizById(quizId);
    }

    @CrossOrigin(origins = "http://localhost:4200"  , allowCredentials = "true")
    @GetMapping("/category/{cid}")
    public List<Quiz> getQuizzesOfCategory(@PathVariable("cid") Long cid){
        Category category = new Category();
        category.setCid(cid);
        return this.quizService.getQuizzesOfCategory(category);
    }

    @CrossOrigin(origins = "http://localhost:4200"  , allowCredentials = "true")
    @GetMapping("/active")
    public List<Quiz> getActiveQuizzes(){
        return this.quizService.getActiveQuizzes();
    }

    @CrossOrigin(origins = "http://localhost:4200"  , allowCredentials = "true" )
    @GetMapping("/category/active/{cid}")
    public List<Quiz> getActiveQuizzesOfCategory(@PathVariable("cid") Long cid){
        Category category = new Category();
        category.setCid(cid);
        return this.quizService.getActiveQuizzesOfCategory(category);
    }

}
