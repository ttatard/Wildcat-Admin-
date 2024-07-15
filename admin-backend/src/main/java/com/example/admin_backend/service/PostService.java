package com.example.admin_backend.service;

import com.example.admin_backend.model.Post;
import com.example.admin_backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    public List<Post> getAllPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc();
    }

    public Post save(Post post) {
        try {
            post.setCreatedAt(LocalDateTime.now()); // Set the current timestamp
            return postRepository.save(post);
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception for debugging
            throw new RuntimeException("Failed to save post: " + e.getMessage());
        }
    }

    public void delete(Long id) {
        postRepository.deleteById(id);
    }
}
