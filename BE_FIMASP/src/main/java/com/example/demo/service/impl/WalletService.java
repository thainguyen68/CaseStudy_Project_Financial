package com.example.demo.service.impl;
import com.example.demo.Model.Cash;
import com.example.demo.Model.Wallet;
import com.example.demo.repository.WalletRepository;
import com.example.demo.service.ICrudCash;
import com.example.demo.service.ICrudWallet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class WalletService implements ICrudWallet {
    @Autowired
    public WalletRepository walletRepository;
    @Autowired
    public ICrudCash cashService;
    @Override
    public Page<Wallet> findAll(Pageable pageable,Long userID) {
        return walletRepository.selectCash(pageable,userID);
    }

    @Override
    public List<Wallet> findAll(Long userId) {
        return null;
    }

    @Override
    public Wallet findOne(Long id) {
        return walletRepository.findById(id).orElse(null);
    }
    @Override
    public void save(Wallet wallet) {
    walletRepository.save(wallet);
    }
    @Override
    public void delete(Long id) {
        List<Cash> cashList= cashService.findCashByWallet(id);
        for (Cash c:cashList) {
            cashService.delete(c.getId());
        }
        walletRepository.deleteById(id);
    }
    @Override
    public Double sumMoney(Long id) {
        return walletRepository.sumMoneyByUserId(id);
    }

    @Override
    public Double sumMoneyByCashMoney(Long id) {
        return walletRepository.sumMoneyByCashMoney(id);
    }

    @Override
    public Double sumMoneyByBankMoney(Long id) {
        return walletRepository.sumMoneyByBankMoney(id);
    }
    @Override
    public Wallet findWalletByUserId(Long userId, Long walletId) {
        return walletRepository.findWalletByIdAccount(userId,walletId);
    }

    @Override
    public Page<Wallet> findAllPage(Pageable pageable,Long userId) {
        return walletRepository.selectCash(pageable,userId);
    }


}
