package com.example.exam.repo;

import com.example.exam.model.Role;
import com.example.exam.model.exam.Category;
import com.example.exam.model.exam.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz,Long> {
    public List<Quiz> findByCategory(Category category);

    public List<Quiz> findByCategoryAndIsActive(Category c , Boolean b);

    public List<Quiz> findByIsActive(Boolean b);
}
