package com.EcoChallenge.Controlador;

import com.EcoChallenge.Modelo.User;
import com.EcoChallenge.Servicios.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/ecochallenge/user")
public class UserController {

    /*accedemos a los servicios*/
    @Autowired
    private UserService userService;

    /*Metodos*/

    /**************  Post-Registro  ************ */
    @PostMapping("/registro")
    public User postUser(@RequestBody User user){return userService.postUser(user);}
}

//************   GET   ********************* */
//@GetMapping("/h")//End point para mi metodo get user
//public String holaMundo(){
//    return "HOLA MUNDO";
//}
//se usan anotaciones para los end point
//@GetMapping("/data")//End point para mi metodo get user

//    @GetMapping()
//    public User getUserEmail(@PathVariable("email") String email){ return userService.getUserEmail(email);}

//************* Iniciar-secion ************* */
//    @PostMapping("/iniciar-sesion")
//    public User iniciarSesion(@RequestBody User user){
//        System.out.println("/**************************************************");
//        System.out.println("Datos: " + user);
//        System.out.println("/**************************************************");
//        return userService.inicarSesion(user.getEmail(), user.getPassword() );
//    }

//
///**************  Delete  ******************* */
//
//@DeleteMapping("/{id}")
//public void deleteUser(@PathVariable("id") long id){
//    userService.deleteUser(id);
//}


///**************  Put   ********************** */
//@PutMapping()
//public User putUser(@RequestBody User user){
//    return userService.putUser(user);
//}
