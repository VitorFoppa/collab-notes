package com.vitor.backend.controller;

import lombok.Data;

@Data
public class NoteRequest {

    private String title;
    private String content;
}