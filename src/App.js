import Searchbar from './components/Searchbar/Searchbar';

import { useState, useEffect } from 'react';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Api from './service/Api';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import Loader from 'react-loader-spinner';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [pictures, setPictures] = useState([]);
  const [currentPictures, setCurrentPictures] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const [openModal, setOpenModal] = useState(false);

 useEffect(() => {
    if (!searchQuery) return;

    setLoader(false)

    Api
      .fetchImages(searchQuery, page, error)
      .then(pictures => {
        if (pictures.length === 0) {
          alert("Pictures not found!");
          
          return;
        }
        setPictures(state => {
          return [...state, ...pictures];
        });
        
      })
      .catch(error => {
        setError(error);
        
      })
      
      .finally(data => {
        window.scrollTo({
          top: document.documentElement.scrollHeight - 995,
          behavior: 'smooth',
        });
      });
   
  }, [searchQuery, page, error]);
  
  const onFormSubmit = query => {
    if (query === searchQuery) {
      return;
    }
      

    setSearchQuery(query);
    setPictures([]);
    setPage(1);
    setError(null);
    setLoader(true);
  };

  const onLoadMore = () => {
    setLoader(true);
    setPage(prevPage => prevPage + 1);
    scrollPage();
  };

  const onImgClick = e => {
    setCurrentPictures(e.target.dataset.img);
    toggleModal();
  };

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

   const scrollPage = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight - 160,
        behavior: 'smooth',
      });
    }, 800);
  };

  return (
      <div className="App">
        {loader && (
          <Modal>
            <Loader type="Rings" color="#00BFFF" height={700} width={700} />
          </Modal>
        )}
        <Searchbar value={searchQuery} onSubmit={onFormSubmit} />
        <ImageGallery pictures={pictures} onImgClick={onImgClick} />
        {pictures.length > 0 && (
          <Button
            onBtnClick={onLoadMore}
            text={loader ? 'Loading' : 'Load More'}
          />
        )}

        {openModal && (
          <Modal onCloseModal={toggleModal}>
            <img src={currentPictures} alt="Dont Worry Be Happy" />
          </Modal>
        )}
      </div>
    );
}
