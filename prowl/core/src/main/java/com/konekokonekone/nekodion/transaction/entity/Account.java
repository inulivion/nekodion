package com.konekokonekone.nekodion.transaction.entity;

import com.konekokonekone.nekodion.transaction.entity.converter.AccountTypeConverter;
import com.konekokonekone.nekodion.transaction.enums.AccountType;
import com.konekokonekone.nekodion.support.entity.AbstractBaseEntity;
import com.konekokonekone.nekodion.support.util.IdGenerator;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "accounts")
public class Account extends AbstractBaseEntity {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "account_type")
    @Convert(converter = AccountTypeConverter.class)
    private AccountType accountType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_template_id")
    private AccountTemplate accountTemplate;

    @Column(name = "account_name")
    private String accountName;

    @PrePersist
    private void prePersist() {
        if (this.id == null) {
            this.id = IdGenerator.generate();
        }
    }

    @OneToMany(mappedBy = "account")
    private List<Transaction> transactions;

    /**
     * 口座残高を算出する（取引の入金・出金を集計）
     */
    public BigDecimal calculateBalance() {
        return transactions.stream()
                .map(t -> switch (t.getDirection()) {
                    case IN -> t.getAmount();
                    case OUT -> t.getAmount().negate();
                })
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
