import React, { useState, useEffect, useCallback } from 'react';
import Tilt from 'react-parallax-tilt';
import { Link, Navigate, useParams } from 'react-router-dom';
import '../css/Poke.css';
import ReactPaginate from 'react-paginate';

export default function Poke() {
    const { pageNumber } = useParams();
    const [pokemonList, setPokemonList] = useState([]);
    const [curPage, setCurPage] = useState(pageNumber);
    const [redirect, setRedirect] = useState(false);
    const [search, setSearch] = useState('')
    const getPokemon = async () => {
        const res = await fetch(`http://127.0.0.1:5000/api/pokemon/${pageNumber}`);
        const data = await res.json()
        // data.forEach(async (course) => {course.sections = await getSections(course.id)})
        if (data.status === 'ok') { setPokemonList(data.pokemon) }

    };
    useEffect(() => {
        setRedirect(false)
        getPokemon()
    }, [pageNumber])

    useEffect(() => { getPokemon() }, [])

    const handlePageClick = (event) => {
        setCurPage(event.selected + 1)
        setRedirect(true)
    }

    const renderPokemon = () => {
        return pokemonList.map((p) => {
            return (
                <Tilt key={`course_${p.id}`} className='course-tilt' glareEnable={true} glareBorderRadius={"15px"} perspective={800}>
                    <Link className="course-card" to={`/pokemon/search/${p.name}`}>

                        <div className='course-content'>
                            <h3>{p.name}</h3>
                        </div>
                        <div className='course-icon-container'>
                            <img src={p.img_url_1} alt={p.name} />
                        </div>

                        <div className='course-hover'>
                            <h2>Catch</h2>
                            <div id="arrowAnim">
                                <div className="arrowSliding">
                                    <div className="arrow"></div>
                                </div>
                                <div className="arrowSliding delay1">
                                    <div className="arrow"></div>
                                </div>
                                <div className="arrowSliding delay2">
                                    <div className="arrow"></div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </Tilt>
            )
        })
    }

    const getSinglePokemon = useCallback(async()=>{
        const res = await fetch(`http://127.0.0.1:5000/api/pokemon/search/${search}`);
        const data = await res.json()
        return data
    },[search])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await getSinglePokemon()
        // data.forEach(async (course) => {course.sections = await getSections(course.id)})
        if (data.status === 'ok') { setRedirect(data.pokemon.name) }
        else {setSearch('invalid Pokemon')}
    }

    return typeof redirect === 'string' ?
        (<Navigate to={`/pokemon/search/${search}`}/>)
        :
        redirect ?
        (<Navigate to={`/pokemon/${curPage}`} />)
        : (
            <div className='no-select'>
                <h1 >Let's catch some Pokemon!</h1>
                <div className='d-flex'>
                    <div className='flex-grow-1'></div>
                    <form onSubmit={(e) => {handleSubmit(e)}} className='search-bar'>
                        <input name='search' type="search" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}/>
                        <button type="submit">Search</button>
                    </form>
                    <div className='flex-grow-1'></div>
                </div>
                <div className='pokemon-container'>
                    {renderPokemon()}
                </div>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={43}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    forcePage={curPage - 1}
                    containerClassName="pagination"
                    activeClassName="active"

                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                />
            </div>
        )
}
