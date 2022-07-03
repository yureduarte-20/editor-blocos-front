import Cookie from 'js-cookie';

export interface IStorage {
    set(key : string, value : unknown) : any;
    get(key : string) : any;
    remove(key : string) : any
}
const storage : IStorage = { set:() =>{}, get:()=>{}, remove:()=>{}};
try {
  if (!window.localStorage) {
    throw Error('no local storage');
  }

  // Setup simple local storage wrapper
  storage.set = (key : string, value : unknown) => localStorage.setItem(key, JSON.stringify(value));
  storage.get = (key : string) => {
    const item = localStorage.getItem(key);
    try {
      return JSON.parse(item as string);
    } catch (e) {
      return null;
    }
  };
  storage.remove = key => localStorage.removeItem(key);
} catch (e) {
  storage.set = Cookie.set;
  storage.get = Cookie.get;
  storage.remove = Cookie.remove;
}

export default storage;