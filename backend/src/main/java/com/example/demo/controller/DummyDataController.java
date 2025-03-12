package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class DummyDataController {

    private final List<Map<String, String>> books = List.of(
        Map.of("id", "1", "title", "To Kill a Mockingbird", "author", "Harper Lee", "genre", "Fiction", "published_date", "1960-07-11", "isbn", "9780061120084", "availability", "true"),
        Map.of("id", "2", "title", "1984", "author", "George Orwell", "genre", "Dystopian", "published_date", "1949-06-08", "isbn", "9780451524935", "availability", "true"),
        Map.of("id", "3", "title", "The Great Gatsby", "author", "F. Scott Fitzgerald", "genre", "Classic", "published_date", "1925-04-10", "isbn", "9780743273565", "availability", "false"),
        Map.of("id", "4", "title", "Moby Dick", "author", "Herman Melville", "genre", "Adventure", "published_date", "1851-10-18", "isbn", "9781503280786", "availability", "true"),
        Map.of("id", "5", "title", "Pride and Prejudice", "author", "Jane Austen", "genre", "Romance", "published_date", "1813-01-28", "isbn", "9781503290563", "availability", "false"),
        Map.of("id", "6", "title", "The Catcher in the Rye", "author", "J.D. Salinger", "genre", "Fiction", "published_date", "1951-07-16", "isbn", "9780316769488", "availability", "true"),
        Map.of("id", "7", "title", "Brave New World", "author", "Aldous Huxley", "genre", "Science Fiction", "published_date", "1932-08-31", "isbn", "9780060850524", "availability", "true"),
        Map.of("id", "8", "title", "The Hobbit", "author", "J.R.R. Tolkien", "genre", "Fantasy", "published_date", "1937-09-21", "isbn", "9780547928227", "availability", "false"),
        Map.of("id", "9", "title", "Crime and Punishment", "author", "Fyodor Dostoevsky", "genre", "Philosophical Fiction", "published_date", "1866-01-01", "isbn", "9780486415871", "availability", "true"),
        Map.of("id", "10", "title", "War and Peace", "author", "Leo Tolstoy", "genre", "Historical Fiction", "published_date", "1869-01-01", "isbn", "9781853260629", "availability", "false")
    );
    

    @GetMapping("/api/data")
    public List<Map<String, String>> getDummyData(@RequestParam(value = "search", required = false) String search) {
        if (search == null || search.isEmpty()) {
            return books; // Return all books if no search query
        }

        return books.stream()
                .filter(book -> book.get("title").toLowerCase().contains(search.toLowerCase()))
                .collect(Collectors.toList());
    }
}
