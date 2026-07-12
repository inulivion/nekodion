package com.konekokonekone.nekodion.transaction.repository;

import com.konekokonekone.nekodion.transaction.entity.Account;
import com.konekokonekone.nekodion.transaction.enums.AccountType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

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
                AND a.accountType <> 'UNCATEGORIZED'
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

    Optional<Account> findByUserIdAndAccountType(String userId, AccountType accountType);

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
}
