import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, BookOpen, CheckCircle, XCircle } from "lucide-react";

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  published_date: string;
  isbn: string;
  availability: boolean;
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/api/data", {
          params: { search: query },
        });
        setBooks(response.data);
      } catch (err) {
        setError("Failed to fetch books");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Debounce API calls to reduce unnecessary requests
    const delayDebounce = setTimeout(() => {
      fetchBooks();
    }, 300); // Wait 300ms before making a request

    return () => clearTimeout(delayDebounce); // Cleanup timeout
  }, [query]); // Runs when query changes

  return (
    <div className="flex flex-col justify-center items-center bg-gray-500/70 w-full min-h-screen gap-2">
      <h1 className="text-white text-2xl mb-4">Book List</h1>

      <div className="w-full h-[100px] bg-gray-700 rounded-xl px-4 flex items-center justify-center gap-3">
        <Search className="h-5 w-5 text-white" />
        <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          placeholder="Search for a book"
          className="w-full h-full bg-white rounded-xl px-4 text-black"
        />
      </div>

      {loading && <p className="text-white mt-2">Loading...</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div className="grid grid-cols-1 gap-4 w-full max-w-3xl mt-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="flex bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors duration-200"
          >
            <div className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-2">
                    <BookOpen className="h-5 w-5 text-indigo-500 mt-1 flex-shrink-0" />
                    <div>
                      <h2 className="text-xl font-semibold text-white">
                        {book.title}
                      </h2>
                      <p className="text-gray-300">{book.author}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      book.availability
                        ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    }`}
                  >
                    {book.availability ? (
                      <>
                        <CheckCircle className="h-3.5 w-3.5 mr-1" />
                        <span>Available</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-3.5 w-3.5 mr-1" />
                        <span>Unavailable</span>
                      </>
                    )}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300 border border-gray-600">
                    {book.genre}
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-400">
                <div>
                  <span className="font-medium">ISBN:</span> {book.isbn}
                </div>
                <div>
                  <span className="font-medium">Published:</span>{" "}
                  {book.published_date}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
