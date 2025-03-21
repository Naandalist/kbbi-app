export const networkStatus = {
  isConnected: async (url = 'https://www.google.com', timeout = 5000) => {
    try {
      // Create an AbortController to handle timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        method: 'HEAD', // only need headers, not the body
        cache: 'no-cache',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      console.log('Network connectivity check failed:', error.message);
      return false;
    }
  },

  monitorConnection: (callback, interval = 5000) => {
    let timerId = null;
    let isCurrentlyConnected = null;

    const checkConnection = async () => {
      const connected = await networkStatus.isConnected();

      // Only trigger callback if the state has changed
      if (connected !== isCurrentlyConnected) {
        isCurrentlyConnected = connected;
        callback(connected);
      }

      timerId = setTimeout(checkConnection, interval);
    };

    return {
      start: () => {
        if (!timerId) {
          checkConnection();
        }
      },
      stop: () => {
        if (timerId) {
          clearTimeout(timerId);
          timerId = null;
        }
      },
    };
  },
};
