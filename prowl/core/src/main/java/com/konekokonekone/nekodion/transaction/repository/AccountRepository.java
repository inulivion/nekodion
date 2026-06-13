package com.konekokonekone.nekodion.transaction.repository;

import com.konekokonekone.nekodion.transaction.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {

    @Query("""
            SELECT
                a
            FROM
                Account a
            LEFT JOIN FETCH
                a.transactions
            WHERE
                a.userId = :userId
            """)
    List<Account> findByUserIdWithTransactions(String userId);

    @Query("""
            SELECT
                a
            FROM
                Account a
            LEFT JOIN FETCH
                a.transactions
            LEFT JOIN FETCH
                a.accountTemplate
            WHERE
                a.id = :id
                AND a.userId = :userId
            """)
    Optional<Account> findByIdAndUserIdWithTransactions(Long id, String userId);

    Boolean existsByUserIdAndAccountName(String userId, String accountName);

    Optional<Account> findByIdAndUserId(Long id, String userId);

    @Query("""
            SELECT
                a
            FROM
                Account a
            LEFT JOIN FETCH
                a.accountTemplate
            WHERE
                a.userId = :userId
            """)
    List<Account> findByUserIdWithTemplate(String userId);

    /**
     * CARDを除く初期残高の合計を取得（総資産計算用）
     */
    @Query("""
            SELECT
                COALESCE(SUM(a.initialAmount), 0)
            FROM
                Account a
            WHERE
                a.userId = :userId
                AND a.accountType <> 'CARD'
            """)
    BigDecimal sumInitialAmountExcludingCard(String userId);
}
