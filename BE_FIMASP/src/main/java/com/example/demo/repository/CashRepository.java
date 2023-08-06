package com.example.demo.repository;
import com.example.demo.Model.Cash;
import com.example.demo.Model.CashCategoryResult;
import com.example.demo.Model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.time.LocalDate;
import java.util.List;

@Transactional
@Repository
public interface CashRepository extends JpaRepository<Cash,Long> {
@Query(value = "select c from Cash c where c.account.id=:userId")
Page<Cash> findCashByUserId(Pageable pageable, @Param("userId") Long id);

@Query(value = "select c from Cash c where c.account.id=:userId and c.type = 'expence'")
List<Cash> findAllByExpense(@Param("userId") Long id);

@Query(value = "select new com.example.demo.Model.CashCategoryResult(c.category.name,sum(c.money)) " +
        "from Cash c inner join Category ca on c.category.id = ca.id where c.wallet is not null and c.account.id = :userId " +
        "and c.type = 'expence' and c.date>=:startDate and c.date<=:endDate group by c.category.name " +
        "order by sum(c.money) desc ")
List<CashCategoryResult> findAllByCategory(@Param("userId") Long id,@Param("startDate")LocalDate starDate,@Param("endDate")LocalDate endDate);

    @Query(value = "select new com.example.demo.Model.CashCategoryResult(c.category.name,sum(c.money)) " +
            "from Cash c inner join Category ca on c.category.id = ca.id where c.wallet is not null and c.account.id = :userId " +
            "and c.type = 'income' and c.date>=:startDate and c.date<=:endDate group by c.category.name " +
            "order by sum(c.money) desc ")
    List<CashCategoryResult> findAllIncomeByCategory(@Param("userId") Long id,@Param("startDate")LocalDate starDate,@Param("endDate")LocalDate endDate);
@Query(value = "select sum(c.money) from Cash c where c.account.id = :userId and c.type = 'expence' and c.date>=:startDate and c.date<=:endDate")
Double totalMoneyExpenseByTime(@Param("userId") Long id,@Param("startDate")LocalDate starDate,@Param("endDate")LocalDate endDate);
@Query(value = "select c from Cash c where c.account.id=:userId and c.date>=:startDate and c.date<=:endDate")
    Page<Cash> findCashByDateStart(Pageable pageable,@Param("userId")Long id, @Param("startDate")LocalDate starDate,@Param("endDate")LocalDate endDate);

@Query(value = "select c from Cash  c where c.account.id=:userId and c.wallet.id=:walletId and c.date=:startDate and c.date=:endDate")
    Page<Cash> findCashByWalletId(Pageable pageable,@Param("userId")Long userId ,@Param("walletId")Long walletId,@Param("startDate")LocalDate startDate,
                                  @Param("endDate")LocalDate endDate);
@Query(value = "select c from Cash c where c.account.id=:userId and c.wallet.id=:walletId")
    Page<Cash> searchCash(Pageable pageable,@Param("userId")Long userId,@Param("walletId")Long walletId);
    @Query(value = "select c from Cash  c where c.wallet.id=:walletId")
    List<Cash> findCashByWallet(@Param("walletId")Long walletId);
@Query(value = "select c from Cash c where c.account.id=:userId and c.wallet.id=:walletId")
    List<Cash> findAllCashByWalletId(@Param("userId") Long userId ,@Param("walletId")Long walletId);
@Query(value = "select c from Cash c where c.account.id=:userId and c.date=:dayNow")
    List<Cash> searchCashByDayNow(@Param("userId") Long userId,@Param("dayNow") LocalDate dateNow);
@Query(value = "select c from Cash c where c.account.id=:userId and c.wallet.id=:walletId and c.date=:dayNow")
    List<Cash> searchCashByWalletIdAndDayNow(@Param("userId") Long userId,@Param("walletId")Long walletId,@Param("dayNow")LocalDate dayNow);
@Query(value = "select sum (c.money) from Cash c where c.account.id=:userId and c.date=:dayNow and c.type='income' ")
    Double moneyIncome(@Param("userId") Long userId,@Param("dayNow")LocalDate dayNow );
@Query(value = "select sum (c.money) from Cash c where c.account.id=:userId and c.date=:dayNow and c.type='expence'")
    Double moneyExpence(@Param("userId") Long userId,@Param("dayNow")LocalDate dayNow );

@Query(value = "select c.date,c.type,sum(c.money) as totalMoney from Cash c where c.wallet is not null and c.account.id=:userId and c.date >=:startDate and c.date<=:endDate group by c.type,c.date")
List<Object> getSumByTypeAndDate(LocalDate startDate,LocalDate endDate,Long userId);
    @Query(value = "select c from Cash  c where c.wallet is not null and c.category.id=:categoryId")
    List<Cash> findCashByCategory_Id(@Param("categoryId")Long categoryId);

    @Query(value = "select month(c.date),sum(c.money),c.type from Cash  c where c.wallet is not null and c.account.id=:userId and year(c.date)=:year group by month(c.date),year(c.date),c.type")
    List<Object> getDifferenceIncomeExpenseByMonth(@Param("userId") Long userId,@Param("year")int year);

    @Query(value = "select sum(c.money),c.wallet.name from Cash  c where c.wallet is not null and  c.account.id=:userId and c.date=:date and c.type = 'expence'group by c.wallet.name order by sum(c.money) desc")
    List<Object> getSumByWalletAndDate(@Param("userId") Long userId,@Param("date")LocalDate date);

}
