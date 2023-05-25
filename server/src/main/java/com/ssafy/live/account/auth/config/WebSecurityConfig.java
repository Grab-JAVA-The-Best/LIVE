package com.ssafy.live.account.auth.config;

import com.ssafy.live.account.auth.jwt.JwtAuthenticationFilter;
import com.ssafy.live.account.auth.jwt.JwtTokenProvider;
import com.ssafy.live.account.auth.jwt.RealtorsProvider;
import com.ssafy.live.account.auth.jwt.UsersProvider;
import com.ssafy.live.account.realtor.service.CustomRealtorDetailService;
import com.ssafy.live.account.user.service.CustomUserDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsUtils;

@RequiredArgsConstructor
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtTokenProvider jwtTokenProvider;
    private final RedisTemplate redisTemplate;
    private final CustomUserDetailService customUserDetailService;
    private final UsersProvider usersProvider;
    private final CustomRealtorDetailService customRealtorDetailService;
    private final RealtorsProvider realtorsProvider;

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
            .httpBasic().disable()
            .csrf().disable()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .formLogin().disable()
            .authorizeRequests()
            .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
            .antMatchers("/users", "/users/login", "/users/reissue", "/users/id", "/realtors",
                "/realtors/login", "/realtors/id", "/realtors/reissue", "/consultings").permitAll()
            .antMatchers("/users/**", "/realtors/**").permitAll().antMatchers("/consultings/**")
            .permitAll()
            .antMatchers("/contracts/**").permitAll()
            .antMatchers("/items/**").permitAll()
            .antMatchers("/items").permitAll()
            .antMatchers("/reviews").permitAll()
            .and()
            .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider, redisTemplate),
                UsernamePasswordAuthenticationFilter.class);

    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(usersProvider);
        auth.userDetailsService(customUserDetailService).passwordEncoder(passwordEncoder());
        auth.authenticationProvider(realtorsProvider);
        auth.userDetailsService(customRealtorDetailService).passwordEncoder(passwordEncoder());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
