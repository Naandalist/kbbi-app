import {useEffect, useCallback, useState} from 'react';
import {getData, showError} from '../../../utils';
import {initialData} from '../constants';

export const useWordDetail = (selectedLetter, pressedWord) => {
  const [wordDetail, setWordDetail] = useState(initialData);

  const fetchWordData = useCallback(async () => {
    try {
      const res = await getData(selectedLetter, pressedWord);
      if (res.error) {
        showError('Kata yang dicari tidak ditemukan.');
      } else if (res.message === 'Fetch Success') {
        setWordDetail(res.data);
      }
    } catch (err) {
      showError('Terjadi kesalahan saat mengambil data.');
      console.error(err);
    }
  }, [pressedWord, selectedLetter]);

  useEffect(() => {
    fetchWordData();
  }, [fetchWordData]);

  return {wordDetail, fetchWordData};
};
