package com.EcoChallenge.Controlador;

import com.EcoChallenge.Modelo.User;
import com.EcoChallenge.Servicios.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(path = "api/udemy/user")
public class UserController {

    /*adcedemos a los servicios*/
    @Autowired
    private UserService userService;

    /*Metodos*/

    @GetMapping("/h")//End point para mi metodo get user
    public String holaMundo(){
        return "HOLA MUNDO";
    }

    /**************************************************
     GET
     ************************************************* */

    //se usan anotaciones para los end point
    //@GetMapping("/data")//End point para mi metodo get user


    @GetMapping()
    public User getUserEmail(@PathVariable("email") String email){ return userService.getUserEmail(email);}

    /**************************************************
     Post-Registro
     ************************************************* */

    @PostMapping("/registro")
    public User postUser(@RequestBody User user){return userService.postUser(user);}


    /**************************************************
     Iniciar-secion
     ************************************************* */
    @PostMapping("/iniciar-sesion")
    public User iniciarSesion(@RequestBody User user){
        System.out.println("/**************************************************");
        System.out.println("Datos: " + user);
        System.out.println("/**************************************************");
        return userService.inicarSesion(user.getEmail(), user.getPassword() );
    }

    /**************************************************
     Put
     ************************************************* */

    @PutMapping()
    public User putUser(@RequestBody User user){
        return userService.putUser(user);
    }

    /**************************************************
     Delete
     ************************************************* */

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") long id){
        userService.deleteUser(id);
    }
}
