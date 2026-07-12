package com.konekokonekone.nekodion.transaction.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.konekokonekone.nekodion.category.entity.Category;
import com.konekokonekone.nekodion.support.entity.AbstractBaseEntity;
import com.konekokonekone.nekodion.support.util.IdGenerator;
import com.konekokonekone.nekodion.transaction.entity.converter.DirectionTypeConverter;
import com.konekokonekone.nekodion.transaction.entity.converter.TransactionTypeConverter;
import com.konekokonekone.nekodion.transaction.enums.DirectionType;
import com.konekokonekone.nekodion.transaction.enums.TransactionType;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "transactions")
public class Transaction extends AbstractBaseEntity {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "user_id")
    private String userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id")
    private Account account;

    @Column(name = "transaction_type")
    @Convert(converter = TransactionTypeConverter.class)
    private TransactionType transactionType;

    @Column(name = "direction")
    @Convert(converter = DirectionTypeConverter.class)
    private DirectionType direction;

    @Column(name = "transaction_name")
    private String transactionName;

    @Column(name = "amount")
    private BigDecimal amount;

    @Column(name = "transaction_at")
    private LocalDateTime transactionDateTime;

    @Column(name = "description")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "transfer_id")
    private Transfer transfer;

    @Column(name = "is_aggregated")
    private Boolean isAggregated;

    @Column(name = "is_confirmed")
    private Boolean isConfirmed;

    @Column(name = "is_read")
    private Boolean isRead;

    @Column(name = "is_deletable")
    private Boolean isDeletable;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @PrePersist
    private void prePersist() {
        if (this.id == null) {
            this.id = IdGenerator.generate();
        }
    }
}
