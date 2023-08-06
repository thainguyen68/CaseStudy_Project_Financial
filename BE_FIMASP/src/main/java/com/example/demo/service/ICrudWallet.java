package com.example.demo.service;
import com.example.demo.Model.Wallet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

public interface ICrudWallet extends ICrud<Wallet>{
    Page<Wallet> findAll(Pageable pageable,Long userId);
    Wallet findOne(Long id);
    void save(Wallet wallet);
    void delete(Long id);
    Double sumMoney(Long id);
    Double sumMoneyByCashMoney(Long id);
    Double sumMoneyByBankMoney(Long id);
    Wallet findWalletByUserId(Long userId,Long walletId);
    Page<Wallet> findAllPage(Pageable pageable,Long userId);
}
