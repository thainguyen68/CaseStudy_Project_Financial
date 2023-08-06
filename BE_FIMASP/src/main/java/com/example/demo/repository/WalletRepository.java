package com.example.demo.repository;
import com.example.demo.Model.Wallet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
@Transactional
@Repository
public interface WalletRepository extends JpaRepository<Wallet,Long> {
    @Query(value = "select w from Wallet w where w.account.id=:userId")
    Page<Wallet> selectCash(Pageable pageable, @Param("userId") Long userId);
    @Query(value = "select sum(w.totalMoney) from Wallet w where w.account.id=:userId")
    Double sumMoneyByUserId(@Param("userId")Long userId);
    @Query(value = "select sum(w.totalMoney) from Wallet w where w.account.id=:userId and w.icon='fa-sack-dollar'")
    Double sumMoneyByCashMoney(@Param("userId")Long userId);
    @Query(value = "select sum(w.totalMoney) from Wallet w where w.account.id=:userId and w.icon='fa-credit-card'")
    Double sumMoneyByBankMoney(@Param("userId")Long userId);
    @Query(value = "select w from Wallet w where w.account.id=:userId and w.id=:walletId")
    Wallet findWalletByIdAccount(@Param("userId")Long userId, @Param("walletId")Long walletId);
}
