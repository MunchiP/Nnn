package com.EcoChallenge.Repositorio;

import com.EcoChallenge.Modelo.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/*
 * ---@Repository---
 * es una anotacion especifica para clases que acceden a datos
 * como realizar consultas SQL, interactuar con la base de datos
 * o usar JPA (Java Persistence API) para manejar entidades.
 * */

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);
}