package com.example.demo.Model;
import com.example.demo.account.Account;
import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDate;
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Cash {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate date;
    @NotNull
    private String name;
    @Positive
    private Double money;
    @NotNull
    private String type;
    @ManyToOne
    private Category category;
    @ManyToOne
    private Account account;
    @ManyToOne
    private Wallet wallet;


}
