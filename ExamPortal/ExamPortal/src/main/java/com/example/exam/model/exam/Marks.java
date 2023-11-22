package com.example.exam.model.exam;

import jakarta.persistence.*;

@Entity
@Table(name="marks")
public class Marks {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Integer userId;
    private String quizId;
    private Integer marks;

    public Marks() {
    }

    public Marks(Long id, Integer userId, String quizId, Integer marks) {
        this.id = id;
        this.userId = userId;
        this.quizId = quizId;
        this.marks = marks;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getQuizId() {
        return quizId;
    }

    public void setQuizId(String quizId) {
        this.quizId = quizId;
    }

    public Integer getMarks() {
        return marks;
    }

    public void setMarks(Integer marks) {
        this.marks = marks;
    }

    @Override
    public String toString() {
        return "Marks{" +
                "id=" + id +
                ", userId=" + userId +
                ", quizId=" + quizId +
                ", marks='" + marks + '\'' +
                '}';
    }
}
