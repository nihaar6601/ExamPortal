package com.example.exam.model.exam;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name="category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long cId;
    private String title;
    private String description;

    @OneToMany(mappedBy = "category" ,fetch = FetchType.EAGER ,cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Quiz> quizzes = new LinkedHashSet<>();

    public Category() {
    }

    public Category(String title, String description) {
        this.title = title;
        this.description = description;
    }

    public Long getCid() {
        return cId;
    }

    public void setCid(Long cId) {
        this.cId = cId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Category{" +
                "cid=" + cId +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
