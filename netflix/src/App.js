import React, {useEffect, useState} from 'react';
import tmdb from './tmdb';
import './App.css';

import MovieRow from './components/MovieRow'

export default () => {

  const [movieList, setMovieList] = useState([]);

  useEffect(()=>{
    const loadAll = async () => {
      // Pegando a lista total
      let list = await tmdb.getHomeList();
      
      setMovieList(list);
    }

    loadAll();
  },[]);

  return(
    <div className='page'>
      <section className='lists'>
        {movieList.map((item,key)=>(
          <div>
            <MovieRow key={key} title={item.title} items={item.items}/>
          </div>
        ))}
      </section>
    </div>
  )
}