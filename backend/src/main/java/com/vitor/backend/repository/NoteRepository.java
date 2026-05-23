package com.vitor.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.vitor.backend.model.Note;
import com.vitor.backend.model.User;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {

    List<Note> findByUser(User user);

    // Consulta customizada: busca onde o usuário é dono (n.user) OU está na lista de compartilhados (s)
    // NoteRepository.java
    @Query("SELECT DISTINCT n FROM Note n LEFT JOIN n.sharedWith s WHERE n.user.id = :userId OR s.id = :userId")
    List<Note> findByUserOrSharedWith(@Param("userId") Long userId);
}