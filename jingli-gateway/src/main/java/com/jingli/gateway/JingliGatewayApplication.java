package com.jingli.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

/**
 * 网关启动程序
 * 
 * @author jingli
 */
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class JingliGatewayApplication
{
    public static void main(String[] args)
    {
        SpringApplication.run(JingliGatewayApplication.class, args);
        System.out.println("(♥◠‿◠)ﾉﾞ  鲸哩网关启动成功   ლ(´ڡ`ლ)ﾞ  ");
    }
}
