import { useState } from 'react';
import './App.css';
import { fetchImages } from 'services/fetchImges';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
let page = 1;
export const App = () => {
  const [data, setData] = useState('');
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('idle');
  const [totalHits, setTotalHits] = useState(0);
  const handleSubmit = async data => {
    if (data.trim() === '') {
      alert('Введіть назву фотографії');
      return;
    } else {
      try {
        setStatus('pending');
        const { totalHits, hits } = await fetchImages(data, page);
        if (hits.length < 1) {
          setStatus('idle');
          alert('Немає фото');
        } else {
          setItems(hits);
          setData(data);
          setTotalHits(totalHits);
          setStatus('resolved');
        }
      } catch (error) {
        setStatus('rejected');
      }
    }
  };

  const addMore = async () => {
    setStatus('pending');
    try {
      const { hits } = await fetchImages(data, (page += 1));
      setItems(prevState => {
        return [...prevState, ...hits];
      });
      setStatus('resolved');
    } catch (error) {
      setStatus('rejected');
    }
    return <Button onClick={addMore} />;
  };

  if (status === 'idle') {
    return (
      <div className="App">
        <Searchbar onSubmit={handleSubmit} />
      </div>
    );
  }
  if (status === 'pending') {
    return (
      <div className="App">
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery page={page} items={items} />
        <Loader />
        {totalHits > 12 && <Button onClick={addMore} />}
      </div>
    );
  }
  if (status === 'rejected') {
    return (
      <div className="App">
        <Searchbar onSubmit={handleSubmit} />
        <span>Wrong!!</span>
      </div>
    );
  }
  if (status === 'resolved') {
    return (
      <div className="App">
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery page={page} items={items} />
        {totalHits > 12 && totalHits > items.length && (
          <Button onClick={addMore} />
        )}
      </div>
    );
  }
};
