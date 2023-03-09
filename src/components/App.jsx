import { useState } from 'react';
import './App.css';
import { fetchImages } from 'services/fetchImges';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
export const App = () => {
  const [Data, setData] = useState('');
  const [Items, setItems] = useState([]);
  const [Status, setStatus] = useState('idle');
  const [TotalHits, setTotalHits] = useState(0);
  const [Page, setPage] = useState(1);

  const handleSubmit = async Data => {
    if (Data.trim() === '') {
      alert('Введіть назву фотографії');
      return;
    } else {
      try {
        setStatus('pending');
        const { totalHits, hits } = await fetchImages(Data, Page);
        if (hits.length < 1) {
          setStatus('idle');
          alert('Немає фото');
        } else {
          setItems(hits);
          setData(Data);
          setTotalHits(totalHits);
          setStatus('resolved');
        }
      } catch (error) {
        setStatus('rejected');
      }
    }
  };

  const AddMore = async () => {
    setStatus('pending');
    try {
      const { hits } = await fetchImages(
        Data,
        setPage(prev => prev + 1)
      );
      setItems(prevState => {
        return [...prevState, ...hits];
      });
      setStatus('resolved');
    } catch (error) {
      setStatus('rejected');
    }
  };

  if (Status === 'idle') {
    return (
      <div className="App">
        <Searchbar onSubmit={handleSubmit} />
      </div>
    );
  }
  if (Status === 'pending') {
    return (
      <div className="App">
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery page={Page} items={Items} />
        <Loader />
        {TotalHits > 12 && <Button onClick={AddMore} />}
      </div>
    );
  }
  if (Status === 'rejected') {
    return (
      <div className="App">
        <Searchbar onSubmit={handleSubmit} />
        <span>Wrong!!</span>
      </div>
    );
  }
  if (Status === 'resolved') {
    return (
      <div className="App">
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery page={Page} items={Items} />
        {TotalHits > 12 && TotalHits > Items.length && (
          <Button onClick={AddMore} />
        )}
      </div>
    );
  }
};
