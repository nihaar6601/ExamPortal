package com.example.exam.repo;

import com.example.exam.model.exam.Marks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarksRepository extends JpaRepository<Marks , Long> {
}
