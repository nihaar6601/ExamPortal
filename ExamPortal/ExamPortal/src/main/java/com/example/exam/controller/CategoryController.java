package com.example.exam.controller;

import com.example.exam.model.exam.Category;
import com.example.exam.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/category")
//@CrossOrigin("*")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;


    @CrossOrigin(origins = "http://localhost:4200"  , allowCredentials = "true")
    @PostMapping
    public ResponseEntity<Category> addCategory(@RequestBody Category category){
        Category category1 = this.categoryService.addCategory(category);
        return ResponseEntity.ok(category1);
    }

    @CrossOrigin(origins = "http://localhost:4200"  , allowCredentials = "true")
    @GetMapping("/{categoryId}")
    public Optional<Category> getCategory(@PathVariable("categoryId") Long categoryId ){
        return categoryService.getCategoryById(categoryId);
    }

    @CrossOrigin(origins = "http://localhost:4200"  , allowCredentials = "true")
    @GetMapping
    public ResponseEntity<?> getCategories(){
        return ResponseEntity.ok(this.categoryService.getCategories());
    }

    @CrossOrigin(origins = "http://localhost:4200"  , allowCredentials = "true")
    @PutMapping
    public Category updateCategory(@RequestBody Category category){
        return this.categoryService.updateCategory(category);
    }

    @CrossOrigin(origins = "http://localhost:4200"  , allowCredentials = "true")
    @DeleteMapping("/{categoryId}")
    public void deleteCategory(@PathVariable("categoryId") Long categoryId){
        this.categoryService.deleteCategoryById(categoryId);
    }
}
