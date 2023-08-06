package com.example.demo.account;
import lombok.AllArgsConstructor;
import lombok.Data;
import javax.persistence.ManyToOne;
@Data
@AllArgsConstructor
public class AccountToken {
    private Long id;
    private String username;
    private String avatar;
    private String token;
    private Role role;
}
