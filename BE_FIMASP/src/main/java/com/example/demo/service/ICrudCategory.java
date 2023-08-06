package com.example.demo.service;
import com.example.demo.Model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
public interface ICrudCategory extends ICrud<Category> {
    Page<Category> findAll(Pageable pageable, Long userId);
    List<Category> findAllByExpences();
    List<Category> findAllByIncome();
    Category findOne(Long id);
    void save(Category category);
    void delete(Long id);

    List<Category> findCategoryExpences(Long id);
    List<Category> findCategoryIncome(Long id);
    List<Category> findCategoryExpencesOnlyUserId(Long id);
    List<Category> findCategoryIncomeOnlyUserId(Long id);
    List<Category> findCategoryExpencesDefault();
    List<Category> findCategoryIncomeDefault();
}
