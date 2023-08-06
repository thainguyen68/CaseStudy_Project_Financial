package com.example.demo.controller;
import com.example.demo.Model.Cash;
import com.example.demo.Model.Category;
import com.example.demo.account.Account;
import com.example.demo.account.service.AccountService;
import com.example.demo.service.ICrudCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
@RestController
@CrossOrigin("*")
@RequestMapping("/user{userId}/categories")
public class CategoryController {
    @Autowired
    public ICrudCategory categoryService;

    @Autowired
    public AccountService accountService;

    @GetMapping()
    public ResponseEntity<Page<Category>> findAllCategory(@PageableDefault(value = 10000) Pageable pageable, @PathVariable Optional<Long> userId){
        if (userId.isPresent()){
            return new ResponseEntity<>(categoryService.findAll(pageable,userId.get()), HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/{id}")
    private ResponseEntity<Category> findOne(@PathVariable Long id){
        return new ResponseEntity<>(categoryService.findOne(id),HttpStatus.OK);
    }

    @GetMapping("/expences")
    public ResponseEntity<List<Category>> findAllByExpence(){
        return new ResponseEntity<>(categoryService.findAllByExpences(), HttpStatus.OK);
    }
    @GetMapping("/income")
    public ResponseEntity<List<Category>> findAllByIncome(){
        return new ResponseEntity<>(categoryService.findAllByIncome(), HttpStatus.OK);
    }
    @PostMapping
    private ResponseEntity<Void> create(@PathVariable Long userId,@RequestBody Category category){
        Account account=accountService.findAccountById(userId);
        category.setAccount(account);
        categoryService.save(category);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    private ResponseEntity<Void> update(@PathVariable Optional<Long> userId,@PathVariable Long id,@RequestBody Category category){
        if (userId.isPresent()){
            Category category1=categoryService.findOne(id);
            Account account=accountService.findAccountById(userId.get());
            if (category1!=null){
                category.setAccount(account);
                categoryService.save(category);
                return new ResponseEntity<>(HttpStatus.ACCEPTED);
            }
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @DeleteMapping("/{id}")
    private ResponseEntity<Void> delete(@PathVariable Long id){
        if(id>8) {
            categoryService.delete(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
     return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
    }
    @GetMapping("/ex")
    private ResponseEntity<List<Category>> findCategoryEx(@PathVariable Optional<Long> userId){
        if (userId.isPresent()){
            return new ResponseEntity<>(categoryService.findCategoryExpences(userId.get()),HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @GetMapping("/in")
    private ResponseEntity<List<Category>> findCategoryIn(@PathVariable Optional<Long> userId){
        if (userId.isPresent()){
            return new ResponseEntity<>(categoryService.findCategoryIncome(userId.get()),HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @GetMapping("/default/ex")
    private ResponseEntity<List<Category>> findCategoryExDefault(){
            return new ResponseEntity<>(categoryService.findCategoryExpencesDefault(),HttpStatus.OK);
    }
    @GetMapping("/default/in")
    private ResponseEntity<List<Category>> findCategoryInDefault(){
            return new ResponseEntity<>(categoryService.findCategoryIncomeDefault(),HttpStatus.OK);
    }

    @GetMapping("/expenseUserId")
    private ResponseEntity<List<Category>> findCategoryExOnlyUserId(@PathVariable Optional<Long> userId){
        if (userId.isPresent()){
            return new ResponseEntity<>(categoryService.findCategoryExpencesOnlyUserId(userId.get()),HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @GetMapping("/incomeUserId")
    private ResponseEntity<List<Category>> findCategoryInOnlyUserId(@PathVariable Optional<Long> userId){
        if (userId.isPresent()){
            return new ResponseEntity<>(categoryService.findCategoryIncomeOnlyUserId(userId.get()),HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
