import { useEffect, useState } from "react";
import { IPost } from "../../interfaces/postInterface";
import { postService } from "../../services/postService";
import { Post } from "../Post/Post";
import { Pagination } from "../Pagination/Pagination";
import { SearchBar } from "../SearchBar/SearchBar";
import style from './Posts.module.css';

const Posts = () => {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const postsPerPage = 10;

    useEffect(() => {
        postService.getAll()
            .then(({ data }) => setPosts(data));
    }, []);

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
        setSuggestions(filteredPosts.map(post => post.title).filter(title =>
            title.toLowerCase().includes(query.toLowerCase())
        ));
    };

    const handleSearchSubmit = (query: string) => {
        alert(`You searched for: ${query}`);
        setSearchQuery('');
        setSuggestions([]);
    };

    return (
        <div>
            <SearchBar
                onSearchChange={handleSearchChange}
                onSearchSubmit={handleSearchSubmit}
                searchQuery={searchQuery}
                suggestions={suggestions}
            />
            <div className={style.PostsContainer}>
                {currentPosts.map(post => <Post key={post.id} post={post} />)}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export { Posts };
