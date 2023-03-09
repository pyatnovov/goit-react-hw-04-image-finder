import axios from "axios";
export async function fetchImages(inputData, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY = '32926436-c6ecc5f5fc4edb6e5a87cae88';
  return await axios.get(
      `${BASE_URL}?q=${inputData}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then(res => {
      return res.data;
    });
};

