package com.EcoChallenge.Servicios;

import com.EcoChallenge.Repositorio.UserRepository;
import com.fasterxml.jackson.databind.DatabindContext;
import com.EcoChallenge.Modelo.User;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

/* @Service---
 *utilizan normalmente para implementar la lógica de negocio de tu aplicación,
 *separándola de la lógica de acceso a datos (@Repository) y del manejo de
 *peticiones HTTP (@Controller).*/
@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    //************** optener nombre y apellido **************/
    public User getUserNombreApellido(){
        DatabindContext session = null;
        return (User) session.getAttribute("usuario");
    }

    //************** guardar usuario **************/
    public User postUser(User user){
        return userRepository.save(user);
    }

}

/* * Actulizar un ususario * */
//    public User putUser(User user){ return userRepository.save(user); }

//    /* * eliminar usuario * */
//    public void deleteUser(long id){ userRepository.deleteById(id); }

