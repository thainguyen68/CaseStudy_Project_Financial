package com.example.demo.account.service;


import com.example.demo.account.Account;
import com.example.demo.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class AccountService implements UserDetailsService, ICrudAccount {
    @Autowired
    private AccountRepository accountRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = accountRepository.findAccountByUsername(username);
        return new User(account.getUsername(),account.getPassword(), account.getAuthorities());
    }
    public Account findAccountByUserName(String username){
        return accountRepository.findAccountByUsername(username);
    }
    @Override
    public Account findAccountById(Long id){
        return accountRepository.findAccountById(id);
    }

    @Override
    public void save(Account account){
        accountRepository.save(account);
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public Account login(String username, String password) {
        return null;
    }

    public boolean checkRegister(String username){
        if(accountRepository.findAccountByUsername(username)!=null){
            return false;
        }
        return true;
    }
    public List<Account> findAll(){
        return accountRepository.findAll();
    }

    @Override
    public Account findOne(Long id) {
        return accountRepository.findAccountById(id);
    }

    public List<Account> findAllByStatus(){
        return accountRepository.findAllByStatus();
    }
    public void deleteById(Long id){
        accountRepository.deleteById(id);
    }

}
