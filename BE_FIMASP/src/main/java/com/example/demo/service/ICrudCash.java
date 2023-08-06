package com.example.demo.service;
import com.example.demo.Model.Cash;
import com.example.demo.Model.CashCategoryResult;
import com.example.demo.Model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.time.LocalDate;
import java.util.List;
public interface ICrudCash extends ICrud<Cash> {
    Cash findOne(Long id);
    void save(Cash cash);
    void delete(Long id);
    List<Cash> findCashExpences(Long userId);
    List<CashCategoryResult> findAllByCategory(Long userId, LocalDate startDate, LocalDate endDate);
    Double totalMoneyExpenseByTime(Long userId, LocalDate startDate, LocalDate endDate);
    Page<Cash> findCashByIdUser(Pageable pageable, Long userId);
    List<Cash> findCashByCategory(Long categoryId);
    Page<Cash> findCashByDate(Pageable pageable,Long userId, LocalDate startDate, LocalDate endDate);
    Page<Cash> findCashByIdWallet(Pageable pageable,Long userId,Long walletId,LocalDate startDate,LocalDate endDate);
    Page<Cash> findCash(Pageable pageable,Long userId,Long walletID);
    List<Cash> findCashByWallet( Long walletId);
    List<Cash> findCashByWalletId(Long userId,Long walletId);
    List<Cash> findCashByDayNow(Long userId,LocalDate dayNow);
    List<Cash> findCashByWalletIdDayNow(Long userId,Long walletId,LocalDate dayNow);
    Double sumMoneyIncomeDayNow(Long userId,LocalDate dayNow);
    Double sumMoneyExpenceDayNow(Long userId,LocalDate dayNow);
    List<Object> getSumByTypeAndDate(LocalDate startDate,LocalDate endDate,Long userId);

    List<Object> getDifferenceIncomeExpenseByMonth(Long userId,int year);
    List<Object> getSumByWalletAndDate(Long userId,LocalDate date);
    List<CashCategoryResult> findAllIncomeByCategory(Long userId, LocalDate startDate, LocalDate endDate);

}
