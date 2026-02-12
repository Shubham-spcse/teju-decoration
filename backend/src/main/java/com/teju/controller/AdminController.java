package com.teju.controller;

import com.teju.model.Category;
import com.teju.model.GalleryImage;
import com.teju.repository.CategoryRepository;
import com.teju.repository.GalleryImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin
public class AdminController {

    private final GalleryImageRepository imageRepo;
    private final CategoryRepository categoryRepo;

    // ABSOLUTE PATH
    private final String UPLOAD_DIR =
            System.getProperty("user.dir") + File.separator + "uploads" + File.separator;

    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public String upload(
            @RequestParam("file") MultipartFile file,
            @RequestParam String photoNumber,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String price,
            @RequestParam Long categoryId
    ) throws IOException {

        // create folder if not exist
        File folder = new File(UPLOAD_DIR);
        if (!folder.exists()) {
            boolean created = folder.mkdirs();
            System.out.println("Folder created: " + created);
        }

        // remove spaces (VERY IMPORTANT)
        String original = file.getOriginalFilename().replace(" ", "_");

        String fileName = System.currentTimeMillis() + "_" + original;

        // save
        File destination = new File(UPLOAD_DIR + fileName);
        file.transferTo(destination);

        // get category
        Category category = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        // save DB
        GalleryImage image = new GalleryImage();
        image.setImageUrl("/uploads/" + fileName);  // for browser
        image.setPhotoNumber(photoNumber);
        image.setDescription(description);
        image.setPrice(price);
        image.setCategory(category);

        imageRepo.save(image);

        return "✅ Image uploaded & saved!";
    }
    @PutMapping("/update/{id}")
    public String update(
            @PathVariable Long id,
            @RequestParam String photoNumber,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String price,
            @RequestParam(required = false) String tag,
            @RequestParam Long categoryId
    ) {

        GalleryImage image = imageRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Image not found"));

        Category category = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        image.setPhotoNumber(photoNumber);
        image.setDescription(description);
        image.setPrice(price);
        image.setTag(tag);
        image.setCategory(category);

        imageRepo.save(image);

        return "✅ Updated successfully";
    }
    @DeleteMapping("/image/{id}")
    public String deleteImage(@PathVariable Long id) {
        imageRepo.deleteById(id);
        return "Deleted successfully";
    }


}
