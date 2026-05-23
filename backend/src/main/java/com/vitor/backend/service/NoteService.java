package com.vitor.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vitor.backend.dto.NoteRequest;
import com.vitor.backend.model.Note;
import com.vitor.backend.model.User;
import com.vitor.backend.repository.NoteRepository;
import com.vitor.backend.repository.UserRepository;

@Service
public class NoteService {

    private final NoteRepository noteRepository;
    private final UserRepository userRepository;

    public NoteService(
            NoteRepository noteRepository,
            UserRepository userRepository
    ) {
        this.noteRepository = noteRepository;
        this.userRepository = userRepository;
    }

    public Note createNote(NoteRequest request, String email) {
        User user = userRepository
                .findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Note note = new Note();
        note.setTitle(request.getTitle());
        note.setContent(request.getContent());
        note.setUser(user);

        return noteRepository.save(note);
    }

    public List<Note> getUserNotes(String email) {
        User user = userRepository
                .findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Agora busca notas onde o usuário é dono OU está na lista de compartilhamento
        return noteRepository.findByUserOrSharedWith(user.getId());
    }

    public Note getNoteById(Long id, String email) {
        User user = userRepository
                .findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found"));

        boolean isOwner = note.getUser().getId().equals(user.getId());
        boolean isShared = note.getSharedWith().stream().anyMatch(u -> u.getId().equals(user.getId()));

        if (!isOwner && !isShared) {
            throw new RuntimeException("Access denied: You do not have permission to view this note");
        }

        return note;
    }

    public Note updateNote(Long id, NoteRequest request, String email) {
        User user = userRepository
                .findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found"));

        boolean isOwner = note.getUser().getId().equals(user.getId());
        boolean isShared = note.getSharedWith().stream().anyMatch(u -> u.getId().equals(user.getId()));

        if (!isOwner && !isShared) {
            throw new RuntimeException("Access denied: You do not have permission to update this note");
        }

        note.setTitle(request.getTitle());
        note.setContent(request.getContent());

        return noteRepository.save(note);
    }

    public void deleteNote(Long id, String email) {
        User user = userRepository
                .findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found"));

        // Delete restrito apenas ao dono da nota
        if (!note.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied: Only the owner can delete this note");
        }

        noteRepository.delete(note);
    }

    @Transactional
    public void shareNote(Long id, String emailToShare, String ownerEmail) {
        User owner = userRepository.findByEmailIgnoreCase(ownerEmail)
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        User targetUser = userRepository.findByEmailIgnoreCase(emailToShare)
                .orElseThrow(() -> new RuntimeException("Target user not found"));

        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found"));

        if (!note.getUser().getId().equals(owner.getId())) {
            throw new RuntimeException("Access denied: You are not the owner");
        }

        note.getSharedWith().add(targetUser);
        noteRepository.save(note);
    }
}