package com.example.demo.repository;
import com.example.demo.account.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
@Repository
@Transactional
public interface AccountRepository extends JpaRepository<Account,Long> {
    @Query(value = "select p from Account p where p.status=true ")
    List<Account> findAllByStatus();
    Account findAccountByUsername(String username);
    @Query(value = "select p from Account p where p.id=:userId ")
    Account findAccountById(@Param("userId") Long id);
    @Override
    void deleteById(Long id);
}


