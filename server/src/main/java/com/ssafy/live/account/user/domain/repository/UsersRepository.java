package com.ssafy.live.account.user.domain.repository;

import com.ssafy.live.account.user.domain.entity.Users;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {
    Optional<Users> findById(String id);
    boolean existsById(String Id);
    Users findByEmailAndId(String email, String id);

    String findByName(String name);
}