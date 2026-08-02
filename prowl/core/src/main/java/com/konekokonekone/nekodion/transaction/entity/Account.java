package com.konekokonekone.nekodion.transaction.entity;

import com.konekokonekone.nekodion.transaction.entity.converter.AccountTypeConverter;
import com.konekokonekone.nekodion.transaction.enums.AccountType;
import com.konekokonekone.nekodion.support.entity.AbstractBaseEntity;
import com.konekokonekone.nekodion.support.util.IdGenerator;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
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

    @Column(name = "closing_day")
    private Integer closingDay;

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
        if (accountType.equals(AccountType.CREDIT)) {
            // クレカ口座の場合は前回締日の翌日以降の取引のみを集計する（締日設定がない場合は直近1ヶ月）
            var criteria = LocalDate.now().minusMonths(1);
            if (closingDay != null) {
                var today = LocalDate.now();
                var clampedDay = Math.min(closingDay, today.lengthOfMonth());
                var lastClosingDate = today.withDayOfMonth(clampedDay);
                if (lastClosingDate.isAfter(today)) {
                    lastClosingDate = lastClosingDate.minusMonths(1);
                    lastClosingDate = lastClosingDate.withDayOfMonth(Math.min(closingDay, lastClosingDate.lengthOfMonth()));
                }
                criteria = lastClosingDate;
            }
            var finalCriteria = criteria;
            return transactions.stream()
                    .filter(t -> t.getTransactionDateTime().toLocalDate().isAfter(finalCriteria))
                    .map(t -> switch (t.getDirection()) {
                        case IN -> t.getAmount();
                        case OUT -> t.getAmount().negate();
                    })
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
        }

        return transactions.stream()
                .map(t -> switch (t.getDirection()) {
                    case IN -> t.getAmount();
                    case OUT -> t.getAmount().negate();
                })
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
