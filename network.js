export default class LSnetwork {  
  constructor() {
    this.data = {};
  }
  getLS(url) {
    this.data = localStorage.getItem(url);
  }

  setLS(url, data) {
    // setTimeout(() => {
      localStorage.setItem(url, data);
    // }, 3000);
  }
}
