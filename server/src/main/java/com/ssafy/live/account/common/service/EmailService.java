package com.ssafy.live.account.common.service;

import java.io.UnsupportedEncodingException;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

@Service
public class EmailService {

    @Autowired
    private JavaMailSenderImpl mailSender;

    @Autowired
    private SpringTemplateEngine templateEngine;


    @Value("${spring.mail.username}")
    private String setFrom;

    public void joinEmail(String email, String password, String name) {
        String toMail = email;
        String title = "[Live] 비밀번호 찾기 메일입니다.";

        Context context = new Context();
        context.setVariable("password", password);
        context.setVariable("name", name);
        String content = templateEngine.process("findPassword", context);
        sendMail(toMail, title, content);
    }

    public void sendMail(String toMail, String title, String content) {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");
            helper.setFrom(new InternetAddress(setFrom, "Live", "UTF-8"));
            helper.setTo(toMail);
            helper.setSubject(title);
            helper.setText(content, true);
            helper.addInline("image1", new ClassPathResource("templates/images/image1.png"));
            helper.addInline("image2", new ClassPathResource("templates/images/image2.png"));
            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }

    }
}
