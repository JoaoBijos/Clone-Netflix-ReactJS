import React, {useEffect, useState} from 'react';
import tmdb from './tmdb';
import './App.css';

import MovieRow from './components/MovieRow/index';
import FeaturedMovie from './components/FeaturedMovie/index';
import Header from './components/Header/index';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(()=>{
    const loadAll = async () => {
      // Pegando a lista total
      let list = await tmdb.getHomeList();
      
      setMovieList(list);

      // Pegando o featured
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }

    loadAll();
  },[]);

  useEffect(()=>{
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, []);

  return(
    <div className='page'>
      
      <Header black={blackHeader}/>

      {featuredData &&
        <FeaturedMovie item={featuredData}/>
      }

      <section className='lists'>
        {movieList.map((item,key)=>(
          <div>
            <MovieRow key={key} title={item.title} items={item.items}/>
          </div>
        ))}
      </section>

      <footer>
        <a>Dados do site Themoviedb.org</a>
        <a>Feito por @JoaoBijos</a>
      </footer>
    </div>
  )
}