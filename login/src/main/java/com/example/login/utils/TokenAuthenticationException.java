package com.example.login.utils;

public class TokenAuthenticationException extends RuntimeException {

    private int code;

    private String message;

    public TokenAuthenticationException(int code, String message) {
        super();
        this.code = code;
        this.message = message;
    }
}