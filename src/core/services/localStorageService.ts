class LocalStore {
  getData(key: string) {
    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : null;
  }

  update(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}

const storage = new LocalStore();
export default storage;
