package com.konekokonekone.nekodion.user.service;

import com.konekokonekone.nekodion.support.exception.EntityNotFoundException;
import com.konekokonekone.nekodion.user.dto.UserDto;
import com.konekokonekone.nekodion.user.entity.User;
import com.konekokonekone.nekodion.user.mapper.UserMapper;
import com.konekokonekone.nekodion.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;

    private final UserMapper userMapper;

    /**
     * 初回ログインユーザーをDBに保存
     * @param auth0Id Auth0のユーザーID
     * @param email email
     * @return 新規作成した場合は作成したユーザーID、既存ユーザーの場合は null
     */
    public String saveUserIfNotExists(String auth0Id, String email) {
        if (userRepository.findByAuth0Id(auth0Id).isPresent()) {
            return null;
        }

        var user = new User();
        user.setAuth0Id(auth0Id);
        user.setEmail(email);
        return userRepository.save(user).getId();
    }

    /**
     * Auth0のユーザーIDからユーザーを取得
     * @param auth0Id Auth0のユーザーID
     * @return ユーザー
     */
    public UserDto findByAuth0Id(String auth0Id) {
        return userRepository.findByAuth0Id(auth0Id)
                .map(userMapper::toDto)
                .orElseThrow(() -> new EntityNotFoundException("ユーザーが見つかりません。"));
    }
}
