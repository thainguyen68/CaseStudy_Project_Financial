package com.example.demo.repository;
import com.example.demo.Model.Cash;
import com.example.demo.Model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
@Repository
@Transactional
public interface CategoryRepository extends JpaRepository<Category,Long> {
    @Query(value = "select c from Category c where c.typeCategory = 'expense'")
    List<Category> findAllByExpense();
    @Query(value = "select c from Category c where c.typeCategory = 'income'")
    List<Category> findAllByIncome();
    @Query(value = "select c from Category c where (c.account.id=:userId or (c.account.id is null)) order by c.account.id nulls last ")
    Page<Category> findAllByAccount_Id(Pageable pageable,@Param("userId") Long id);
    @Query(value = "select c from Category c where (c.account is null or c.account.id = :acc_id) and c.typeCategory = 'expense'")
    List<Category> selectCategoryExByUserId(@Param("acc_id") Long id);
    @Query(value = "select c from Category c where (c.account is null or c.account.id = :acc_id) and c.typeCategory = 'income'")
    List<Category> selectCategoryInByUserId(@Param("acc_id") Long id);
    @Query(value = "select c from Category c where (c.account is null) and c.typeCategory = 'expense'")
    List<Category> selectCategoryExDefault();
    @Query(value = "select c from Category c where (c.account is null) and c.typeCategory = 'income'")
    List<Category> selectCategoryInDefault();
    @Query(value = "select c from Category c where (c.account.id = :acc_id) and c.typeCategory = 'expense'")
    List<Category> selectCategoryExByOnlyUserId(@Param("acc_id") Long id);
    @Query(value = "select c from Category c where (c.account.id = :acc_id) and c.typeCategory = 'income'")
    List<Category> selectCategoryInByOnlyUserId(@Param("acc_id") Long id);


}
