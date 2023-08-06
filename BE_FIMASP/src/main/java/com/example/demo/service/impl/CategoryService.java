package com.example.demo.service.impl;
import com.example.demo.Model.Cash;
import com.example.demo.Model.Category;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.service.ICrudCash;
import com.example.demo.service.ICrudCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class CategoryService implements ICrudCategory {
    @Autowired
    public CategoryRepository categoryRepository;
    @Autowired
    public ICrudCash cashService;

    @Override
    public Page<Category> findAll(Pageable pageable, Long userId) {
        return categoryRepository.findAllByAccount_Id(pageable,userId);
    }


    @Override
    public List<Category> findAll(Long userId) {
        return null;
    }

    @Override
    public Category findOne(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }
    @Override
    public void save(Category category) {
    categoryRepository.save(category);
    }
    @Override
    public void delete(Long id) {
        List<Cash> cashList= cashService.findCashByCategory(id);
        for (Cash c:cashList) {
            c.setCategory(null);
            cashService.save(c);
        }
    categoryRepository.deleteById(id);
    }
    @Override
    public List<Category> findCategoryExpences(Long id) {
        return categoryRepository.selectCategoryExByUserId(id);
    }
    @Override
    public List<Category> findCategoryIncome(Long id) {
        return categoryRepository.selectCategoryInByUserId(id);
    }
    @Override
    public List<Category> findAllByIncome() {
        return categoryRepository.findAllByIncome();
    }

    @Override
    public List<Category> findAllByExpences() {
        return categoryRepository.findAllByExpense();
    }


    @Override
    public List<Category> findCategoryExpencesOnlyUserId(Long id) {
        return categoryRepository.selectCategoryExByOnlyUserId(id);
    }

    @Override
    public List<Category> findCategoryIncomeOnlyUserId(Long id) {
        return categoryRepository.selectCategoryInByOnlyUserId(id);
    }

    @Override
    public List<Category> findCategoryExpencesDefault() {
        return categoryRepository.selectCategoryExDefault();
    }

    @Override
    public List<Category> findCategoryIncomeDefault() {
        return categoryRepository.selectCategoryInDefault();
    }
}
