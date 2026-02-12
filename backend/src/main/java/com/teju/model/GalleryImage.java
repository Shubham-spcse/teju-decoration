package com.teju.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class GalleryImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imageUrl;
    private String tag;


    private String photoNumber;

    private String description;

    private String price;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
