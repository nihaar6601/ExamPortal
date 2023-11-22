package com.example.exam.service;

import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@Service
public class EmailService {
    public boolean sendEmail(String subject , String message , String to){

        boolean flag = false;
        //String from = "nihar.chaudhari@transunion.com";
        String from = "nihaar6601@gmail.com";

        //variable for gmail
        String host = "smtp.gmail.com";
        //String host = "smtp.outlook.com";


        //get the system properties
        Properties properties = System.getProperties();
        System.out.println("Properties" + properties);

        //Setting important information to properties object

        //host set
        properties.put("mail.smtp.host" ,host);
        properties.put("mail.smtp.port" ,"465");
        properties.put("mail.smtp.ssl.enable" ,"true");
        properties.put("mail.smtp.auth" ,"true");

        //Step 1: to get session object

        Session session = Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("nihaar6601" , "bfbvnxzipxubdacx");
            }
        });

        session.setDebug(true);

        // Step 2: compose the message
        MimeMessage m = new MimeMessage(session);

        try{
            m.setFrom(from);

            m.addRecipient(Message.RecipientType.TO , new InternetAddress(to));

            m.setSubject(subject);

            //m.setText(message);
            m.setContent(message , "text/html");
            //send

            //Step 3: send the message using Transport class
            Transport.send(m);
            System.out.println("Sent Success..................");

            flag = true;
        }catch(Exception e){
            e.printStackTrace();
        }

        return flag;
    }
}
