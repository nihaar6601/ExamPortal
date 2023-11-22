package com.example.exam.controller;

import com.example.exam.model.ResetPassword;
import com.example.exam.model.User;
import com.example.exam.repo.UserRepository;
import com.example.exam.service.EmailService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Objects;

@RestController
public class EmailController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
    @PostMapping(value = "auth/send-email")
    public boolean sendOtp(@RequestBody String email, HttpServletRequest request) throws Exception {

        System.out.println("Email is " + email);

        String firstName = email.substring(0 , email.indexOf("."));
        String userName = firstName.substring(0,1).toUpperCase() + firstName.substring(1);
        System.out.println("User fetched from database is : " + userRepository.findByEmail(email));
        User user  = userRepository.findByEmail(email);
        if(user == null){
            throw new Exception("Email does not exists");
        }

        Integer otp = (int) (Math.random() * 9000) + 1000;
        System.out.println("OTP is " + otp);

        String subject = "Reset Password Using OTP";
        String message = ""
                + "<div>"
                + "<p>"
                + "Hi " +  userName + ","
                + "</p>"
                + "<p>"
                + "Use OTP " + "<b>" + otp + "</b>" + " to reset your Career Navigation Tool password."
                + "</p>"
                + "<p>"
                + "Do not share the OTP with anyone else."
                + "</p>"
                + "</div>";
        String to;
        to = email;

        boolean flag = this.emailService.sendEmail(subject, message, to);

        if (flag) {
            HttpSession session = request.getSession(true);
            System.out.println("Session Id : " + session.getId());

            session.setAttribute("sessionOtp", otp);
            session.setAttribute("sessionEmail", email);

            System.out.println("Session Attributes...............");
            Collections.list(session.getAttributeNames()).forEach(name -> System.out.println(name + " : " + session.getAttribute(name)));

            return true;
        }
        else {
            throw new Exception("Email not sent!! Check your connection");
        }
    }


    @CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
    @PostMapping(value = "auth/verify-otp")
    @ResponseBody
    public boolean verifyOtp(@RequestBody Integer otp, HttpServletRequest request) throws Exception{

        //System.out.println("Session Attributes...............");
        //Collections.list(request.getSession().getAttributeNames()).forEach(name -> System.out.println(name + " : " + request.getSession().getAttribute(name)));

        // TRY check for if session already exists
        //System.out.println("Otp from frontend is " + otp);

        System.out.println("Session Id : " + request.getSession().getId());

        Integer myOtp = (Integer) request.getSession().getAttribute("sessionOtp");
        String email = (String) request.getSession().getAttribute("sessionEmail");

        System.out.println("Session Otp is :" + myOtp);
        System.out.println("Session Email is :" + email);

        if (!Objects.equals(otp, myOtp)) {
            throw new Exception("You have entered wrong OTP");
        }

        return true;
    }


    @CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
    @PostMapping(value = "auth/change-password")
    @ResponseBody
    public boolean changePassword(@RequestBody ResetPassword resetPassword, HttpServletRequest request) throws Exception {

        String password = resetPassword.getPassword();
        String confirmPassword = resetPassword.getConfirmPassword();

        if(!Objects.equals(password, confirmPassword)){
            throw new Exception("Passwords do not match");
        }

        String email = (String) request.getSession().getAttribute("sessionEmail");
        User user = userRepository.findByEmail(email);

        user.setPassword(this.passwordEncoder.encode(confirmPassword));
        //user.setPassword(resetPassword.getConfirmPassword());
        userRepository.save(user);

        //Destroy the session..............................................
        request.getSession().invalidate();
        return true;
    }
}
