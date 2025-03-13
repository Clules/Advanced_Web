import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, BookOpen, CheckCircle, XCircle } from "lucide-react";
import { useMediaQuery } from "../lib/useMediaQuery";


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
  const isMobile = useMediaQuery("(max-width: 768px)")

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
    <div className="flex flex-col h-full p-4">
      <div className="mb-8">
        <h1 className="text-black text-2xl font-bold mb-4">Book List</h1>

        <div className="w-full flex justify-center items-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              placeholder="Search for a book"
              className="w-full p-3 border border-black rounded-xl pl-10 pr-4 text-black"
            />
            <Search className="h-5 w-5 text-black absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>
      </div>

      {loading && <p className="text-black text-center my-4">Loading...</p>}
      {error && <p className="text-red-500 text-center my-4">{error}</p>}

      {!isMobile ? (
        <div className="">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="p-3 text-center w-12"></th>
                <th className="p-3 text-center">Title</th>
                <th className="p-3 text-center">Author</th>
                <th className="p-3 text-center">Genre</th>
                <th className="p-3 text-center">Published</th>
                <th className="p-3 text-center">ISBN</th>
                <th className="p-3 text-center">Available</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id} className="border-b border-gray-200">
                  <td className="p-3">
                    <BookOpen className="h-6 w-6 text-black" />
                  </td>
                  <td className="p-3">
                    <h2 className="text-black font-semibold">{book.title}</h2>
                  </td>
                  <td className="p-3">
                    <p className="text-gray-600">{book.author}</p>
                  </td>
                  <td className="p-3">
                    <p className="text-gray-600">{book.genre}</p>
                  </td>
                  <td className="p-3">
                    <p className="text-gray-600">{book.published_date}</p>
                  </td>
                  <td className="p-3">
                    <p className="text-gray-600">{book.isbn}</p>
                  </td>
                  <td className="p-3 text-center">
                    {book.availability ? (
                      <CheckCircle className="h-6 w-6 text-green-500 inline" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-500 inline" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="space-y-4">
          {books.map((book) => (
            <div key={book.id} className="bg-white rounded-lg p-4 border border-gray-400">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-black mr-2" />
                  <h2 className="text-black font-semibold">{book.title}</h2>
                </div>
                <div>
                  {book.availability ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-500" />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-500">Author</p>
                  <p className="text-black">{book.author}</p>
                </div>
                <div>
                  <p className="text-gray-500">Genre</p>
                  <p className="text-black">{book.genre}</p>
                </div>
                <div>
                  <p className="text-gray-500">Published</p>
                  <p className="text-black">{book.published_date}</p>
                </div>
                <div>
                  <p className="text-gray-500">ISBN</p>
                  <p className="text-black">{book.isbn}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {books.length === 0 && !loading && <p className="text-center text-gray-500 my-8">No books found</p>}
    </div>
  )
}

export default BookList;
