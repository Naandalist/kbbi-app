import {useEffect, useState, useCallback} from 'react';
import {showError} from '../../../utils';

// Base URLs from environment variables
const BASE_URLS = {
  jsdelivr: process.env.WORD_CATEGORY_JSDELIVR_URL,
  github: process.env.WORD_CATEGORY_GITHUB_URL,
};

// API Configuration
const API_CONFIG = {
  kelas_kata: {
    baseUrl: 'jsdelivr',
    fileName: 'kelas-kata.json',
    dataKey: 'word_classes',
    errorMessage: 'Gagal mengambil data kelas kata.',
  },
  bahasa: {
    baseUrl: 'jsdelivr',
    fileName: 'bahasa.json',
    dataKey: 'languages',
    errorMessage: 'Gagal mengambil data bahasa.',
  },
  kategori: {
    baseUrl: 'jsdelivr',
    fileName: 'kategori.json',
    dataKey: 'individual_categories',
    errorMessage: 'Gagal mengambil data kategori.',
  },
  lainnya: {
    baseUrl: 'github',
    fileName: 'lainnya.json',
    dataKey: 'categories',
    errorMessage: 'Gagal mengambil data lainnya.',
  },
  bidang_subjek: {
    baseUrl: 'jsdelivr',
    fileName: 'bidang-subjek.json',
    dataKey: 'subject_domains',
    errorMessage: 'Gagal mengambil data bidang subjek.',
  },
};

// Helper function to build full URL
const buildUrl = config => `${BASE_URLS[config.baseUrl]}/${config.fileName}`;

export const useKelasKata = () => {
  // Single state object to manage all data types
  const [apiData, setApiData] = useState(() => {
    const initialState = {};
    Object.keys(API_CONFIG).forEach(key => {
      initialState[key] = {
        loading: true,
        data: [],
        error: null,
      };
    });
    return initialState;
  });

  // Generic fetch function for any API type
  const fetchData = useCallback(async apiType => {
    const config = API_CONFIG[apiType];
    if (!config) return;

    try {
      setApiData(prev => ({
        ...prev,
        [apiType]: {...prev[apiType], loading: true, error: null},
      }));

      const url = buildUrl(config);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const dataArray = result[config.dataKey];

      if (dataArray && Array.isArray(dataArray)) {
        setApiData(prev => ({
          ...prev,
          [apiType]: {
            loading: false,
            data: dataArray,
            error: null,
          },
        }));
      } else {
        throw new Error('Invalid data format');
      }
    } catch (err) {
      console.error(`Error fetching ${apiType} data:`, err);
      setApiData(prev => ({
        ...prev,
        [apiType]: {
          loading: false,
          data: [],
          error: err.message,
        },
      }));
      showError(config.errorMessage);
    }
  }, []);

  // Generic code cleaner function
  const cleanCode = useCallback((code, type) => {
    if (!code) return '';

    if (type === 'kelas_kata' || type === 'lainnya') {
      // Handle special cases like "bentuk terikat -" and "sufiks pembentuk nomina -"
      return code.replace(/\s*-\s*$/, '').trim();
    } else {
      // For other types, extract first word from codes like "Lt Latin" -> "Lt"
      return code.split(' ')[0];
    }
  }, []);

  // Generic lookup function
  const getByCode = useCallback(
    (code, type) => {
      if (!code || !type) return null;

      const currentData = apiData[type];
      if (
        !currentData ||
        currentData.loading ||
        currentData.data.length === 0
      ) {
        console.log(
          `${type} data not ready - loading:`,
          currentData?.loading,
          'data length:',
          currentData?.data?.length,
        );
        return null;
      }

      const cleaned = cleanCode(code, type);
      let result;

      if (type === 'kelas_kata') {
        // First try exact match (for multi-word codes like "bentuk terikat")
        result = currentData.data.find(
          item => item.kode.toLowerCase() === cleaned.toLowerCase(),
        );

        // If no exact match, try first word only (for codes like "ukp Ungkapan" -> "ukp")
        if (!result) {
          const firstWord = cleaned.split(' ')[0].toLowerCase();
          result = currentData.data.find(
            item => item.kode.toLowerCase() === firstWord,
          );
        }
      } else {
        // For other types, simple exact match
        result = currentData.data.find(item => item.kode === cleaned);
      }

      console.log(
        `${type} lookup - original code:`,
        code,
        'clean code:',
        cleaned,
        'result:',
        result,
      );
      return result;
    },
    [apiData, cleanCode],
  );

  const getKelasKataByCode = useCallback(
    code => getByCode(code, 'kelas_kata'),
    [getByCode],
  );
  const getBahasaByCode = useCallback(
    code => getByCode(code, 'bahasa'),
    [getByCode],
  );
  const getKategoriByCode = useCallback(
    code => getByCode(code, 'kategori'),
    [getByCode],
  );
  const getLainnyaByCode = useCallback(
    code => getByCode(code, 'lainnya'),
    [getByCode],
  );
  const getBidangSubjekByCode = useCallback(
    code => getByCode(code, 'bidang_subjek'),
    [getByCode],
  );

  // Unified function to get info based on type
  const getInfoByCodeAndType = useCallback(
    (code, tipe) => {
      console.log('getInfoByCodeAndType called with:', {
        code,
        tipe,
        kelasKataLoading: apiData.kelas_kata?.loading,
        bahasaLoading: apiData.bahasa?.loading,
        kategoriLoading: apiData.kategori?.loading,
        lainnyaLoading: apiData.lainnya?.loading,
        bidangSubjekLoading: apiData.bidang_subjek?.loading,
      });

      return getByCode(code, tipe);
    },
    [apiData, getByCode],
  );

  // Fetch all data on mount
  useEffect(() => {
    Object.keys(API_CONFIG).forEach(apiType => {
      fetchData(apiType);
    });
  }, [fetchData]);

  // Memoized refetch function
  const refetch = useCallback(() => {
    Object.keys(API_CONFIG).forEach(apiType => {
      fetchData(apiType);
    });
  }, [fetchData]);

  return {
    // Backward compatibility - expose individual data objects
    kelasKataData: apiData.kelas_kata,
    bahasaData: apiData.bahasa,
    kategoriData: apiData.kategori,
    lainnyaData: apiData.lainnya,
    bidangSubjekData: apiData.bidang_subjek,

    // Getter functions
    getKelasKataByCode,
    getBahasaByCode,
    getKategoriByCode,
    getLainnyaByCode,
    getBidangSubjekByCode,
    getInfoByCodeAndType,

    // Utility functions
    refetch,
  };
};
