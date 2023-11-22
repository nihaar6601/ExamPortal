package com.example.exam.controller;

import com.example.exam.model.exam.Question;
import com.example.exam.model.exam.Quiz;
import com.example.exam.service.QuestionService;
import com.example.exam.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import static org.apache.logging.log4j.message.MapMessage.MapFormat.JSON;

@RestController
@RequestMapping("/question")
//@CrossOrigin("*")
public class QuestionController {
    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuizService quizService;

    @CrossOrigin(origins = "http://localhost:4200"  , allowCredentials = "true")
    @PostMapping
    public ResponseEntity<Question> addQuestion(@RequestBody Question question){
        Question question1 = this.questionService.addQuestion(question);
        return ResponseEntity.ok(question1);
    }

    @CrossOrigin(origins = "http://localhost:4200"  , allowCredentials = "true")
    @GetMapping("/{questionId}")
    public Optional<Question> getQuestion(@PathVariable("questionId") Long questionId ){
        return questionService.getQuestionById(questionId);
    }

    @CrossOrigin(origins = "http://localhost:4200"  , allowCredentials = "true")
    @GetMapping
    public ResponseEntity<?> getQuestions(){
        return ResponseEntity.ok(this.questionService.getQuestions());
    }

    @CrossOrigin(origins = "http://localhost:4200"  , allowCredentials = "true")
    @PutMapping
    public Question updateQuestion(@RequestBody Question question){
        return this.questionService.updateQuestion(question);
    }

    @CrossOrigin(origins = "http://localhost:4200"  , allowCredentials = "true")
    @DeleteMapping("/{questionId}")
    public void deleteQuestion(@PathVariable("questionId") Long questionId){
        this.questionService.deleteQuestionById(questionId);
    }

    @CrossOrigin(origins = "http://localhost:4200"  , allowCredentials = "true")
    @GetMapping("/quiz/{qId}")
    public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable("qId") Long qId){
//        Quiz quiz = new Quiz();
//        quiz.setqId(qId);
//        Set<Question> questionsOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);
//        return ResponseEntity.ok(questionsOfQuiz);

        Optional<Quiz> quiz = this.quizService.getQuizById(qId);
        Set<Question> questions = quiz.get().getQuestions();
        List<Question> list = new ArrayList(questions);
        if(list.size()>Integer.parseInt(quiz.get().getNumberOfQuestions())){
            list = list.subList(0,Integer.parseInt(quiz.get().getNumberOfQuestions()+1));
        }

//        list.forEach((q)->{
//            q.setAnswer("");
//        });

        Collections.shuffle(list);
        return ResponseEntity.ok(list);
    }

    @CrossOrigin(origins = "http://localhost:4200"  , allowCredentials = "true")
    @GetMapping("/quiz/all/{qId}")
    public ResponseEntity<?> getQuestionsOfQuizAdmin(@PathVariable("qId") Long qId){
        Quiz quiz = new Quiz();
        quiz.setqId(qId);
        Set<Question> questionsOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);
        return ResponseEntity.ok(questionsOfQuiz);

    }

    @CrossOrigin(origins = "http://localhost:4200"  , allowCredentials = "true")
    @PostMapping("/eval-quiz")
    public Map<String , Object> evalQuiz(@RequestBody List<Question> questions){
        double marksGot = 0;
        int correctAnswers = 0;
        int attempted = 0;

        System.out.println(questions);
        for(Question q:questions){
            Question question = this.questionService.getQuestion(q.getQuesId());
            if(!q.getGivenAnswer().equals("") && question.getAnswer().equals(q.getGivenAnswer())){
                correctAnswers  = correctAnswers + 1;

                double marksPerQuestion = Double.parseDouble(questions.get(0).getQuiz().getMaxMarks())/questions.size();
                marksGot = marksGot + marksPerQuestion;
            }
            if(!q.getGivenAnswer().equals("")){
                attempted++;
            }
        }

        System.out.println(marksGot + " " + correctAnswers + " " + attempted);

        Map<String, Object> map = new HashMap<>();

        map.put("marks", marksGot);
        map.put("answers", correctAnswers);
        map.put("attempted", attempted);
        System.out.println("map : " + List.of(map));
//        Map<String , Object> map = Map.of("Marks : " ,marksGot , "Correct Answers : ",correctAnswers ,"Attempted : ", attempted  );
        return map;
    }

}
