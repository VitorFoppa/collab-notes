package com.vitor.backend.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.vitor.backend.dto.NoteRequest;
import com.vitor.backend.dto.NoteResponse;
import com.vitor.backend.model.Note;
import com.vitor.backend.service.NoteService;

@RestController
@RequestMapping("/notes")
@CrossOrigin("*")
public class NoteController {

    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @PostMapping
    public NoteResponse create(
            @RequestBody NoteRequest request,
            Principal principal
    ) {
        validatePrincipal(principal);

        Note note = noteService.createNote(
                request,
                principal.getName()
        );

        return new NoteResponse(note);
    }

    @GetMapping
    public List<Note> getAll(Principal principal) {
        validatePrincipal(principal);
        return noteService.getUserNotes(principal.getName());
    }

    @GetMapping("/{id}")
    public Note getById(
            @PathVariable Long id,
            Principal principal
    ) {
        validatePrincipal(principal);
        return noteService.getNoteById(id, principal.getName());
    }

    @PutMapping("/{id}")
    public Note update(
            @PathVariable Long id,
            @RequestBody NoteRequest request,
            Principal principal
    ) {
        validatePrincipal(principal);

        return noteService.updateNote(
                id,
                request,
                principal.getName()
        );
    }

    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Long id,
            Principal principal
    ) {
        validatePrincipal(principal);
        noteService.deleteNote(id, principal.getName());
    }

    // --- NOVO ENDPOINT: COMPARTILHAMENTO ---
    @PostMapping("/{id}/share")
    public void shareNote(
            @PathVariable Long id,
            @RequestParam String emailToShare,
            Principal principal
    ) {
        validatePrincipal(principal);
        noteService.shareNote(id, emailToShare, principal.getName());
    }

    // Método auxiliar para garantir que o principal nunca seja nulo
    private void validatePrincipal(Principal principal) {
        if (principal == null) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED, 
                    "Requisição não autenticada. Token JWT ausente ou inválido."
            );
        }
    }
}