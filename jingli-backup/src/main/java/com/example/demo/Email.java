package com.example.demo;

/**
 * Created by wenhui on 2022/2/21.
 */

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author WENHUI
 * @version 1.0
 * @description: 邮件发送
 * @date 2022/2/21 17:14
 */
@Controller
public class Email {

    @Autowired
    private JavaMailSender mailSender;
    @RequestMapping("/send")
    @ResponseBody
    private void send(){

        SimpleMailMessage message = new SimpleMailMessage();
        // 发件人
        message.setFrom("litiechui2021@163.com");
        // 收件人
        message.setTo("544061884@qq.com");
        // 邮件标题
        message.setSubject("Java发送邮件第二弹");
        // 邮件内容
        message.setText("你好，这是二条用于测试Spring Boot邮件发送功能的邮件！哈哈哈~~~");
        // 抄送人
        message.setCc("litiechuixj@163.com");
        mailSender.send(message);
    }
}
