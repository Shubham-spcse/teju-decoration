package com.teju.controller;

import com.teju.model.GalleryImage;
import com.teju.repository.GalleryImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gallery")
@RequiredArgsConstructor
@CrossOrigin
public class GalleryController {

    private final GalleryImageRepository repo;

    @GetMapping("/{categoryId}")
    public List<GalleryImage> getByCategory(@PathVariable Long categoryId) {
        return repo.findByCategoryId(categoryId);
    }

    @GetMapping("/all")
    public List<GalleryImage> all() {
        return repo.findAll();
    }

}
