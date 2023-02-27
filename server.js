import LSnetwork from "./network.js";

export default class FakeServer {  
  constructor() {
    this.data = {};
  }

  get(url) {
    return new Promise((resolve, reject) => {
      try {
        // const key = this.getKeyFromUrl(url);
        const NWLS = new LSnetwork();
        NWLS.getLS(url);
        let data = NWLS.data;
        this.data = JSON.parse(data);
        const value = this.data;
        setTimeout(() => {
          if (value) {
            resolve(value);
          } else {
            reject(new Error("Not found"));
          }
        }, 3000);
      } catch (error) {
        reject(error);
      }
    });
  }

  post(url, data) {
    return new Promise((resolve, reject) => {
      try {
        // const key = this.getKeyFromUrl(url);
        const NWLS = new LSnetwork();
        const value = JSON.stringify(data);
        this.data[url] = value;
        NWLS.setLS(url, value);
        // localStorage.setItem(url, value)
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  put(url, data) {
    return new Promise((resolve, reject) => {
      try {
        // const key = this.getKeyFromUrl(url);
        const value = JSON.stringify(data);
        this.data[url] = value;
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  delete(url) {
    return new Promise((resolve, reject) => {
      try {
        // const key = this.getKeyFromUrl(url);
        delete this.data[url];
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  //   getKeyFromUrl(url) {
  //     const regex = /\/([^\/]*)$/;
  //     const match = regex.exec(url);
  //     return match[1];
  //   }

  //   simulateNetworkRequest() {
  //     return new Promise((resolve) => {
  //       setTimeout(() => {
  //         resolve();
  //       }, 1000);
  //     });
  //   }
}
