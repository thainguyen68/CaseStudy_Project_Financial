package com.example.demo.service.impl;
import com.example.demo.Model.Cash;
import com.example.demo.Model.CashCategoryResult;
import com.example.demo.Model.Category;
import com.example.demo.repository.CashRepository;
import com.example.demo.service.ICrudCash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
@Service
public class CashService implements ICrudCash {
    @Autowired
  private CashRepository cashRepository;

    @Override
    public List<Cash> findAll(Long userId) {
        return null;
    }
    @Override
    public Cash findOne(Long id) {
        return cashRepository.findById(id).orElse(null);
    }
    @Override
    public void save(Cash cash) {
        cashRepository.save(cash);
    }
    @Override
    public void delete(Long id) {
        cashRepository.deleteById(id);
    }
    @Override
    public Page<Cash> findCashByIdUser(Pageable pageable, Long userId) {
        return cashRepository.findCashByUserId(pageable, userId);
    }

    @Override
    public List<Cash> findCashByCategory(Long categoryId) {
        return cashRepository.findCashByCategory_Id(categoryId);
    }

    @Override
    public List<Cash> findCashExpences(Long id) {
        return cashRepository.findAllByExpense(id);
    }

    @Override
    public List<CashCategoryResult> findAllByCategory(Long userId, LocalDate startDate, LocalDate endDate) {
        return cashRepository.findAllByCategory(userId,startDate,endDate);
    }

    @Override
    public  List<Object> getSumByTypeAndDate(LocalDate startDate,LocalDate endDate,Long userId){
        return cashRepository.getSumByTypeAndDate(startDate, endDate,userId);
    }
    @Override
    public Double totalMoneyExpenseByTime(Long userId, LocalDate startDate, LocalDate endDate) {
        return cashRepository.totalMoneyExpenseByTime(userId,startDate,endDate);
    }

    @Override
    public Page<Cash> findCashByDate(Pageable pageable, Long userId, LocalDate startDate, LocalDate endDate) {
        return cashRepository.findCashByDateStart(pageable, userId, startDate, endDate);
    }
    public List<Cash> findCashByWallet( Long walletId) {
        return cashRepository.findCashByWallet(walletId);
    }



    @Override
    public Page<Cash> findCashByIdWallet(Pageable pageable, Long userId, Long walletId, LocalDate startDate, LocalDate endDate) {
        return cashRepository.findCashByWalletId(pageable, userId, walletId, startDate, endDate);
    }

    @Override
    public Page<Cash> findCash(Pageable pageable, Long userId, Long walletID) {
        return cashRepository.searchCash(pageable, userId, walletID);
    }

    @Override
    public List<Cash> findCashByWalletId(Long userId, Long walletId) {
        return cashRepository.findAllCashByWalletId(userId, walletId);
    }

    @Override
    public List<Cash> findCashByDayNow(Long userId, LocalDate dayNow) {
        return cashRepository.searchCashByDayNow(userId, dayNow);
    }

    @Override
    public List<Cash> findCashByWalletIdDayNow(Long userId, Long walletId, LocalDate dayNow) {
        return cashRepository.searchCashByWalletIdAndDayNow(userId, walletId, dayNow);
    }

    @Override
    public Double sumMoneyIncomeDayNow(Long userId, LocalDate dayNow) {
        return cashRepository.moneyIncome(userId,dayNow);
    }

    @Override
    public Double sumMoneyExpenceDayNow(Long userId, LocalDate dayNow) {
        return cashRepository.moneyExpence(userId,dayNow);
    }
@Override
    public List<Object> getDifferenceIncomeExpenseByMonth(Long userId,int year){
        return  cashRepository.getDifferenceIncomeExpenseByMonth(userId,year);
    }
    @Override
    public  List<Object> getSumByWalletAndDate(Long userId,LocalDate date){
        return  cashRepository.getSumByWalletAndDate(userId,date);
    }

    @Override
    public List<CashCategoryResult> findAllIncomeByCategory(Long userId, LocalDate startDate, LocalDate endDate) {
        return cashRepository.findAllIncomeByCategory(userId,startDate,endDate);
    }

}


